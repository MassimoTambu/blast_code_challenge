import _ from 'lodash';
import { Duration } from 'shared/models/duration';
import {
  HitGroupKinds,
  KilledKinds,
  MoneyChangeKinds,
  PlayerTriggerKinds,
  TeamKinds,
  ThrowableArmamentKinds,
  VictoryKinds,
} from 'shared/models/enums';
import { GameResultsStats } from 'shared/models/stats/game_results_stats';
import { PlayerStats } from 'shared/models/stats/player_stats';
import { Event } from './event';
import { GameOverEvent } from './match_status/game_over_event';
import { GameVictoryEvent } from './match_status/game_victory_event';
import { RestartRoundEvent } from './match_status/restart_round_event';
import { RoundEndEvent } from './match_status/round_end_event';
import { RoundVictoryEvent } from './match_status/round_victory_event';
import { AttackedEvent } from './player_actions/attacked_event';
import { KilledEvent } from './player_actions/killed_event';
import { MoneyChangeEvent } from './player_actions/money_change_event';
import { PlayerTeamEvent } from './player_actions/player_team_event';
import { PlayerTriggeredEvent } from './player_actions/player_triggered_event';
import { PlayerWithKillsStats } from 'shared/models/stats/player_with_kills_stats';
import { PlayerWithMoneyStats } from 'shared/models/stats/player_with_money_stats';
import { RoundWonConditionsStats } from 'shared/models/stats/round_won_conditions_stats';
import {
  HitCounterStats,
  HitCounterStatsWithFatalHeadshots,
} from 'shared/models/stats/hit_counter_stats';
import { MVPStats } from 'shared/models/stats/mvp_stats';
import { ArmamentStats } from 'shared/models/stats/armament_stats';
import { PlayerSwitchedTeamEvent } from './player_actions/player_switched_team_event';
import { KDAStats } from 'shared/models/stats/kda_stats';
import { AssistedKillingEvent } from './player_actions/assisted_killing_event';
import { KillHeadshotPercentageStats } from 'shared/models/stats/kill_headshot_percentage_stats';
import { HitHeadshotPercentageStats } from 'shared/models/stats/hit_headshot_percentage_stats';
import { PlayerBombStats } from 'shared/models/stats/player_bomb_stats';
import { BlindedEvent } from './player_actions/blinded_event';
import { BlindedStats } from 'shared/models/stats/blinded_stats';
import { MolotovStats } from 'shared/models/stats/molotov_stats';
import { GeneralRoundStats } from 'shared/models/stats/general_round_stats';
import { MoneySpentPerRoundStats } from 'shared/models/stats/money_spent_per_round_stats';
import {
  ThrowableArmamentUsedPerRoundStats,
  ThrowableArmamentUsedStats,
} from 'shared/models/stats/throwable_armament_used_per_round_stats';
import { ThrewEvent } from './player_actions/threw_event';
import { TeamEvent } from './match_status/team_event';
import { DroppedEvent } from './player_actions/dropped_event';
import { LeftBuyZoneEvent } from './player_actions/left_buy_zone_event';
import { SayEvent } from './player_actions/say_event';
import { PickedUpEvent } from './player_actions/picked_up_event';
import { Round } from './round';

export class GameData {
  // All events from the match start
  public events: Event[];
  public eventsPerRound: Round[] = [];
  // Players that are playing the game, bot and spectator excluded
  public players: string[] = [];

  public constructor(events: Event[]) {
    // Take the last RestartRoundEvent. slice() is needed because reverse() mutates the original array
    const lastRestartRound = _(events)
      .slice()
      .reverse()
      .find((e) => e instanceof RestartRoundEvent);

    if (lastRestartRound === undefined) {
      throw new Error('Unable to find any event of class RestartRoundEvent');
    }

    this.events = events.filter((e) => e.dateTime > lastRestartRound.dateTime);
    console.log(
      `Filtered ${
        events.length - this.events.length
      } events captured before the match starts`
    );
    console.log(`All events: ${events.length}`);
    console.log(`Current captured events: ${this.events.length}`);

    let roundNumber = 1;
    let newRoundIndex = this.events.findIndex(
      (e) => e instanceof RoundEndEvent
    );
    const tmpEvents = this.events.slice();

    while (newRoundIndex !== -1) {
      const roundEvents = tmpEvents.splice(0, newRoundIndex + 1);
      this.eventsPerRound.push({
        number: roundNumber,
        events: roundEvents,
      });

      newRoundIndex = tmpEvents.findIndex((e) => e instanceof RoundEndEvent);
      roundNumber++;
    }

    this.players.push(
      ..._.map(
        _.filter(
          _.map(
            _.groupBy(
              events.filter(
                (e) => e instanceof PlayerSwitchedTeamEvent
              ) as PlayerSwitchedTeamEvent[],
              (e) => e.playerName
            ),
            (v, k) => {
              return { name: k, events: v };
            }
          ),
          (v) =>
            v.events.some(
              (e) => e.to === TeamKinds.CT || e.to === TeamKinds.Terrorist
            )
        ),
        (v) => v.name
      )
    );
  }

  public getGameResults(): GameResultsStats {
    const gameVictoryEvent = this.events.find(
      (e) => e instanceof GameVictoryEvent
    );
    const gameOverEvent = this.events.find((e) => e instanceof GameOverEvent);

    if (_.isUndefined(gameVictoryEvent) || _.isUndefined(gameOverEvent)) {
      throw new Error('GameVictoryEvent | GameOverEvent not found');
    }

    const duration: Duration = _.isUndefined(gameOverEvent)
      ? {}
      : (gameOverEvent as GameOverEvent).duration;
    const teamWinner = _.isUndefined(gameVictoryEvent)
      ? ''
      : (gameVictoryEvent as GameVictoryEvent).teamWinner;

    return {
      duration,
      teamWinner,
    };
  }

  public getPlayerWithTheMostKills(): PlayerWithKillsStats {
    const events = this.events
      .filter((e) => e instanceof KilledEvent)
      .map((e) => e as KilledEvent);
    const res = _.orderBy(
      _.groupBy(events, (e) => e.name),
      (x) => x.length,
      'desc'
    ).at(0);

    if (_.isUndefined(res) || _.isUndefined(res.at(0))) {
      throw new Error('Failed to get Player with the most kills');
    }

    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      player: res.at(0)!.name,
      kills: res.length,
    };
  }

  public getPlayerWithTheMostMoney(): PlayerWithMoneyStats {
    const events = this.events
      .filter(
        (e) =>
          e instanceof MoneyChangeEvent && e.kind === MoneyChangeKinds.Increment
      )
      .map((e) => e as MoneyChangeEvent);
    const res = _.orderBy(
      _.groupBy(events, (e) => e.name),
      (x) => x.length,
      'desc'
    ).at(0);

    if (_.isUndefined(res) || _.isUndefined(res.at(0))) {
      throw new Error('Failed to get Player with the most kills');
    }

    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      player: res.at(0)!.name,
      money: res.map((e) => e.change).reduce((acc, curr) => (acc += curr), 0),
    };
  }

  public getHitCounter(player?: {
    name: string;
    kind: 'dealt' | 'sustained';
  }): HitCounterStatsWithFatalHeadshots {
    // I use Lodash to iterate lazily in the events array
    let attackedEvents = _(this.events).filter(
      (e) => e instanceof AttackedEvent
    );
    let fatalHeadshotsEvents = _(this.events).filter(
      (e) =>
        e instanceof KilledEvent &&
        (e.kind === KilledKinds.Headshot ||
          e.kind === KilledKinds.HeadshotPenetrated)
    );

    if (!_.isUndefined(player)) {
      if (player.kind === 'dealt') {
        attackedEvents = attackedEvents.filter(
          (e) => (e as AttackedEvent).name === player.name
        );
        fatalHeadshotsEvents = fatalHeadshotsEvents.filter(
          (e) => (e as KilledEvent).name === player.name
        );
      } else {
        attackedEvents = attackedEvents.filter(
          (e) => (e as AttackedEvent).attackedPlayer.name === player.name
        );
        fatalHeadshotsEvents = fatalHeadshotsEvents.filter(
          (e) => (e as KilledEvent).killedPlayer.name === player.name
        );
      }
    }

    const hitGroups = attackedEvents.map(
      (e) => (e as AttackedEvent).damage.hitgroup
    );
    const hitGroupList = hitGroups.countBy().value() as HitCounterStats;
    const fatalHeadshots = fatalHeadshotsEvents.value().length;

    return {
      hitCounterStats: { ...hitGroupList },
      fatalHeadshots,
    };
  }

  /**
   * Follows CS:GO MVP rules to calculate MVP https://counterstrike.fandom.com/wiki/MVP
   * MVP goes to one of the players who won the round following eliminations, bomb defused and bomb planted and exploded
   */
  public getMVP(): MVPStats {
    const players: { name: string; points: number }[] = [];

    for (const r of this.eventsPerRound) {
      const roundVictoryEvent = r.events.find(
        (e) => e instanceof RoundVictoryEvent
      ) as RoundVictoryEvent | undefined;

      if (_.isUndefined(roundVictoryEvent)) {
        throw new Error('Round Victory not found in Round ' + r.number);
      }

      switch (roundVictoryEvent.kind) {
        // Player should be the MVP if he has defused the bomb and killed atleast one player, otherwise it goes to the player with most eliminations
        case VictoryKinds.BombDefused: {
          const playerTriggeredEvent = r.events.find(
            (e) =>
              e instanceof PlayerTriggeredEvent &&
              e.kind === PlayerTriggerKinds.Defused_The_Bomb
          ) as PlayerTriggeredEvent | undefined;

          if (_.isUndefined(playerTriggeredEvent)) {
            throw new Error(
              `Player triggered event not found in Round ${r.number} with kind ${roundVictoryEvent.kind}`
            );
          }

          // The player who defused the bomb is the MVP if he has atleast one kill
          if (
            r.events.filter(
              (e) =>
                e instanceof KilledEvent && e.name === playerTriggeredEvent.name
            ).length >= 1
          ) {
            this.upsertMVPList(players, playerTriggeredEvent);
          }
          // Otherwise MVP goes to player in the winner team with the most eliminations
          else {
            const playerWithTheMostKills =
              this.findPlayerWithTheMostEliminations(r, roundVictoryEvent);

            if (
              !_.isUndefined(playerWithTheMostKills) &&
              playerWithTheMostKills.length > 0
            ) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              this.upsertMVPList(players, playerWithTheMostKills.at(0)!);
            }
          }

          break;
        }
        case VictoryKinds.CTACE:
        case VictoryKinds.TerroristACE: {
          const playerWithTheMostKills = this.findPlayerWithTheMostEliminations(
            r,
            roundVictoryEvent
          );

          if (
            !_.isUndefined(playerWithTheMostKills) &&
            playerWithTheMostKills.length > 0
          ) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.upsertMVPList(players, playerWithTheMostKills.at(0)!);
          }
          break;
        }
        case VictoryKinds.BombExploded: {
          const playerWhoPlantedTheBomb = r.events.find(
            (e) =>
              e instanceof PlayerTriggeredEvent &&
              e.kind === PlayerTriggerKinds.Planted_The_Bomb
          ) as PlayerTriggeredEvent | undefined;

          if (_.isUndefined(playerWhoPlantedTheBomb)) {
            throw new Error(
              `Player triggered event not found in Round ${r.number} with kind ${roundVictoryEvent.kind}`
            );
          }

          this.upsertMVPList(players, playerWhoPlantedTheBomb);
          break;
        }
        default:
          throw new Error(
            `VictoryKind ${roundVictoryEvent.kind} is not implemented to determine MVP`
          );
      }
    }

    // * I should check if more than one player has the same points and find another way to determine who is the MVP, but for now, it is fine
    return _.orderBy(players, (p) => p.points, 'desc')[0];
  }

  private upsertMVPList(
    players: { name: string; points: number }[],
    playerTeamEvent: PlayerTeamEvent
  ): void {
    const playerIdx = players.findIndex((p) => p.name === playerTeamEvent.name);

    if (playerIdx === -1) {
      players.push({ name: playerTeamEvent.name, points: 1 });
    } else {
      players[playerIdx].points += 1;
    }
  }

  private findPlayerWithTheMostEliminations(
    round: Round,
    roundVictoryEvent: RoundVictoryEvent
  ): KilledEvent[] | undefined {
    const playerKilledEvents = (round.events.filter(
      (e) =>
        e instanceof KilledEvent && e.team === roundVictoryEvent.victoriousTeam
    ) ?? []) as KilledEvent[];
    // * I should check if more than one player has the same kills and find another way to determine who is the MVP, but for now, it is fine
    return _.orderBy(
      _.groupBy(playerKilledEvents, (e) => e.name),
      (v) => v.length,
      'desc'
    ).at(0);
  }

  public getRoundWonConditions(): RoundWonConditionsStats {
    const roundVictoryEvents = (this.events.filter(
      (e) => e instanceof RoundVictoryEvent
    ) ?? []) as RoundVictoryEvent[];
    return {
      counters: _.countBy(roundVictoryEvents, (e) => e.kind) as {
        [key in VictoryKinds]: number;
      },
    };
  }

  public getListOfArmamentBought(playerName?: string): ArmamentStats[] {
    let armamentsBought = _(this.events).filter(
      (e) =>
        e instanceof MoneyChangeEvent && e.kind === MoneyChangeKinds.Decrement
    );

    if (!_.isUndefined(playerName)) {
      armamentsBought = armamentsBought.filter(
        (e) => (e as MoneyChangeEvent).name === playerName
      );
    }

    return _.orderBy(
      _.map(
        _.groupBy(
          armamentsBought.value(),
          (e) => (e as MoneyChangeEvent).armament
        ),
        (v, k) => {
          return { armament: k, count: v.length };
        }
      ),
      (v) => v.count,
      'desc'
    );
  }

  public async getPlayersStats(): Promise<PlayerStats[]> {
    return await Promise.all(
      this.players.map((name) => this.getPlayerStats(name))
    );
  }

  private async getPlayerStats(name: string): Promise<PlayerStats> {
    const armamentsBought = this.getListOfArmamentBought(name);
    const team = this.getPlayerTeams(name);
    const hitCounterDealt = this.getHitCounter({ name, kind: 'dealt' });
    const hitCounterSustained = this.getHitCounter({ name, kind: 'sustained' });
    const kda = this.getPlayerKDA(name);
    const killHeadshotPercentage = this.getPlayerKillHeadshotPercentage(name);
    const hitHeadshotPercentage = this.getPlayerHitHeadshotPercentage(name);
    const bombsStats = this.getPlayerBombsStats(name);
    const blindedStats = this.getPlayerBlindedStats(name);
    const molotovStats = this.getPlayerMolotovDamage(name);

    return {
      name,
      team,
      armamentsBought,
      hitCounter: { dealt: hitCounterDealt, sustained: hitCounterSustained },
      kda,
      killHeadshotPercentage,
      hitHeadshotPercentage,
      bombs: bombsStats,
      blinded: blindedStats,
      molotovDamage: molotovStats,
    };
  }

  public getPlayerTeams(name: string): string {
    const firstRound = this.eventsPerRound.at(0);

    if (_.isUndefined(firstRound)) {
      throw new Error('No rounds found');
    }

    // Take any kind of PlayerTeamEvent
    const firstPlayerTeamEvent = _(firstRound.events).find(
      (e) =>
        (e instanceof AssistedKillingEvent ||
          e instanceof AttackedEvent ||
          e instanceof BlindedEvent ||
          e instanceof DroppedEvent ||
          e instanceof KilledEvent ||
          e instanceof KilledEvent ||
          e instanceof LeftBuyZoneEvent ||
          e instanceof MoneyChangeEvent ||
          e instanceof PickedUpEvent ||
          e instanceof PlayerTriggeredEvent ||
          e instanceof SayEvent ||
          e instanceof ThrewEvent) &&
        e.name === name
    ) as PlayerTeamEvent | undefined;

    if (_.isUndefined(firstPlayerTeamEvent)) {
      throw new Error('No PlayerTeamEvent found');
    }

    const teamEvent = _(firstRound.events).find(
      (e) => e instanceof TeamEvent && e.CSGOTeam === firstPlayerTeamEvent.team
    ) as TeamEvent | undefined;

    if (_.isUndefined(teamEvent)) {
      throw new Error('No team found for player ' + firstPlayerTeamEvent.name);
    }

    return teamEvent.team;
  }

  public getPlayerKDA(name: string): KDAStats {
    const kills = _(this.events)
      .filter((e) => e instanceof KilledEvent && e.name === name)
      .value().length;
    const deaths = _(this.events)
      .filter((e) => e instanceof KilledEvent && e.killedPlayer.name === name)
      .value().length;
    const assists = _(this.events)
      .filter((e) => e instanceof AssistedKillingEvent && e.name === name)
      .value().length;

    return {
      kills,
      deaths,
      assists,
    };
  }

  public getPlayerKillHeadshotPercentage(
    name: string
  ): KillHeadshotPercentageStats {
    const killedEvents = _(this.events)
      .filter((e) => e instanceof KilledEvent && e.name === name)
      .value() as KilledEvent[];

    const killCounter = killedEvents.length;
    const headshotKillCounter = killedEvents.filter(
      (e) =>
        e.kind === KilledKinds.Headshot ||
        e.kind === KilledKinds.HeadshotPenetrated
    ).length;

    return {
      totalKills: killCounter,
      headshotKills: headshotKillCounter,
      percentage: (headshotKillCounter * 100) / killCounter,
    };
  }

  public getPlayerHitHeadshotPercentage(
    name: string
  ): HitHeadshotPercentageStats {
    const attackedEvents = _(this.events)
      .filter((e) => e instanceof AttackedEvent && e.name === name)
      .value() as AttackedEvent[];

    const hitCounter = attackedEvents.length;
    const headshotHitsCounter = attackedEvents.filter(
      (e) => e.damage.hitgroup === HitGroupKinds.Head
    ).length;

    return {
      totalHits: hitCounter,
      headshotHits: headshotHitsCounter,
      percentage: (headshotHitsCounter * 100) / hitCounter,
    };
  }

  public getPlayerBombsStats(name: string): PlayerBombStats {
    const bombStats: PlayerBombStats = {
      defused: {
        total: 0,
        A: 0,
        B: 0,
      },
      planted: {
        total: 0,
        A: 0,
        B: 0,
      },
      exploded: {
        total: 0,
        A: 0,
        B: 0,
      },
    };

    const playerTriggeredEvents = _(this.events).filter(
      (e) => e instanceof PlayerTriggeredEvent && e.name === name
    );

    const bombDefused = playerTriggeredEvents
      .filter(
        (e) =>
          (e as PlayerTriggeredEvent).kind ===
          PlayerTriggerKinds.Defused_The_Bomb
      )
      .value() as PlayerTriggeredEvent[];

    bombStats.defused.A = bombDefused.filter((e) => e.bombSite === 'A').length;
    bombStats.defused.B = bombDefused.filter((e) => e.bombSite === 'B').length;
    bombStats.defused.total = bombDefused.length;

    const bombPlanted = playerTriggeredEvents
      .filter(
        (e) =>
          (e as PlayerTriggeredEvent).kind ===
          PlayerTriggerKinds.Planted_The_Bomb
      )
      .value() as PlayerTriggeredEvent[];

    bombStats.planted.A = bombPlanted.filter((e) => e.bombSite === 'A').length;
    bombStats.planted.B = bombPlanted.filter((e) => e.bombSite === 'B').length;
    bombStats.planted.total = bombPlanted.length;

    _(this.eventsPerRound).forEach((r) => {
      const plantedEvent = _(r.events).find(
        (e) =>
          e instanceof PlayerTriggeredEvent &&
          e.name === name &&
          e.kind === PlayerTriggerKinds.Planted_The_Bomb
      ) as PlayerTriggeredEvent | undefined;

      if (_.isUndefined(plantedEvent) || _.isUndefined(plantedEvent.bombSite))
        return;

      const bombExplodedEvent = _(r.events).find(
        (e) =>
          e instanceof RoundVictoryEvent && e.kind === VictoryKinds.BombExploded
      ) as RoundVictoryEvent | undefined;

      if (_.isUndefined(bombExplodedEvent)) return;

      if (plantedEvent.bombSite === 'A') {
        bombStats.exploded.A += 1;
      }
      // bombSite is 'B'
      else {
        bombStats.exploded.B += 1;
      }

      bombStats.exploded.total += 1;
    });

    return bombStats;
  }

  public getPlayerBlindedStats(name: string): BlindedStats {
    const blindedEvents = _(this.events).filter(
      (e) => e instanceof BlindedEvent
    );

    const blindedDealt = blindedEvents
      .filter((e) => (e as BlindedEvent).armamentOwnerPlayer.name === name)
      .value() as BlindedEvent[];
    const blindedSustained = blindedEvents
      .filter((e) => (e as BlindedEvent).name === name)
      .value() as BlindedEvent[];

    return {
      dealtInSeconds: blindedDealt
        .map((b) => b.duration.seconds ?? 0)
        .reduce((acc, s) => acc + s, 0),
      sustainedInSeconds: blindedSustained
        .map((b) => b.duration.seconds ?? 0)
        .reduce((acc, s) => acc + s, 0),
    };
  }

  public getPlayerMolotovDamage(name: string): MolotovStats {
    // The armament 'inferno' is classified as molotov damage
    const attackedWithMolotovEvents = _(this.events).filter(
      (e) => e instanceof AttackedEvent && e.damage.armament === 'inferno'
    );

    const damageDealtEvents = attackedWithMolotovEvents
      .filter((e) => (e as AttackedEvent).name === name)
      .value() as AttackedEvent[];
    const damageSustainedEvents = attackedWithMolotovEvents
      .filter((e) => (e as AttackedEvent).attackedPlayer.name === name)
      .value() as AttackedEvent[];

    return {
      damageDealt: damageDealtEvents
        .map((e) => e.damage.damageHealth)
        .reduce((acc, d) => acc + d, 0),
      damageSustained: damageSustainedEvents
        .map((e) => e.damage.damageHealth)
        .reduce((acc, d) => acc + d, 0),
    };
  }

  public getGeneralRoundStats(): GeneralRoundStats {
    const timePerRound = _(this.eventsPerRound)
      .map((r) => {
        const firstEvent = r.events.at(0);

        if (_.isUndefined(firstEvent)) {
          throw new Error('No events found in round ' + r.number);
        }

        const timeInMs =
          r.events[r.events.length - 1].dateTime.getTime() -
          firstEvent.dateTime.getTime();

        return {
          number: r.number,
          seconds: timeInMs / 1000,
        };
      })
      .sortBy((x) => x.seconds)
      .value();

    const shortestRound = timePerRound[0];
    const longestRound = timePerRound[timePerRound.length - 1];

    return {
      longestRound,
      shortestRound,
    };
  }

  public getMoneySpentPerRound(): MoneySpentPerRoundStats {
    return {
      rounds: _(this.eventsPerRound)
        .map<{ number: number; CTMoney: number; TerroristMoney: number }>(
          (r) => {
            const moneyChangeEvents = _(r.events).filter(
              (e) =>
                e instanceof MoneyChangeEvent &&
                e.kind === MoneyChangeKinds.Decrement
            );

            const ctMoney =
              moneyChangeEvents
                .filter((e) => (e as MoneyChangeEvent).team === TeamKinds.CT)
                .map((e) => (e as MoneyChangeEvent).change)
                .reduce((acc, curr) => acc + curr, 0) ?? 0;
            const terroristsMoney =
              moneyChangeEvents
                .filter(
                  (e) => (e as MoneyChangeEvent).team === TeamKinds.Terrorist
                )
                .map((e) => (e as MoneyChangeEvent).change)
                .reduce((acc, curr) => acc + curr, 0) ?? 0;

            return {
              number: r.number,
              CTMoney: ctMoney,
              TerroristMoney: terroristsMoney,
            };
          }
        )
        .sortBy((r) => r.number)
        .value(),
    };
  }

  public getThrowableArmamentsUsedPerRound(): ThrowableArmamentUsedPerRoundStats {
    return {
      rounds: _(this.eventsPerRound)
        .map<{
          number: number;
          total: number;
          CT: ThrowableArmamentUsedStats;
          Terrorists: ThrowableArmamentUsedStats;
        }>((r) => {
          const threwEvents = _(r.events).filter(
            (e) => e instanceof ThrewEvent
          ) as unknown as _.Collection<ThrewEvent>;

          const ctSmokes = this.getThrowableArmamentCount(
            threwEvents,
            ThrowableArmamentKinds.SmokeGrenade,
            TeamKinds.CT
          );
          const terroristsSmokes = this.getThrowableArmamentCount(
            threwEvents,
            ThrowableArmamentKinds.SmokeGrenade,
            TeamKinds.Terrorist
          );

          const ctFlashbangs = this.getThrowableArmamentCount(
            threwEvents,
            ThrowableArmamentKinds.Flashbang,
            TeamKinds.CT
          );
          const terroristsFlashbangs = this.getThrowableArmamentCount(
            threwEvents,
            ThrowableArmamentKinds.Flashbang,
            TeamKinds.Terrorist
          );

          const ctMolotov = this.getThrowableArmamentCount(
            threwEvents,
            ThrowableArmamentKinds.Molotov,
            TeamKinds.CT
          );
          const terroristsMolotov = this.getThrowableArmamentCount(
            threwEvents,
            ThrowableArmamentKinds.Molotov,
            TeamKinds.Terrorist
          );

          return {
            number: r.number,
            total:
              ctSmokes +
              ctFlashbangs +
              ctMolotov +
              terroristsSmokes +
              terroristsFlashbangs +
              terroristsMolotov,
            CT: {
              smokes: ctSmokes,
              flashbangs: ctFlashbangs,
              molotov: ctMolotov,
            },
            Terrorists: {
              smokes: terroristsSmokes,
              flashbangs: terroristsFlashbangs,
              molotov: terroristsMolotov,
            },
          };
        })
        .sortBy((r) => r.number)
        .value(),
    };
  }

  private getThrowableArmamentCount(
    events: _.Collection<ThrewEvent>,
    throwableArmament: ThrowableArmamentKinds,
    team: TeamKinds
  ): number {
    return events
      .filter(
        (e) =>
          (e as ThrewEvent).armament === throwableArmament &&
          (e as ThrewEvent).team === team
      )
      .value().length;
  }
}
