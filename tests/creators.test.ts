import { assert, expect } from 'chai';
import { EventCreator } from '../src/core/event_creator';
import { PlayerSwitchedTeamCreator } from '../src/core/player_actions/player_switched_team_creator';
import { PlayerTeamCreator } from '../src/core/player_actions/player_team_creator';
import { PickedUpCreator } from '../src/core/player_actions/picked_up_creator';
import { DroppedCreator } from '../src/core/player_actions/dropped_creator';
import { LeftBuyZoneCreator } from '../src/core/player_actions/left_buy_zone_creator';
import { MoneyChangeCreator } from '../src/core/player_actions/money_change_creator';
import { AttackedCreator } from '../src/core/player_actions/attacked_creator';
import { KilledCreator } from '../src/core/player_actions/killed_creator';
import { AssistedKillingCreator } from '../src/core/player_actions/assisted_killing_creator';
import { ThrewCreator } from '../src/core/player_actions/threw_creator';
import { BlindedCreator } from '../src/core/player_actions/blinded_creator';
import { PlayerTriggeredCreator } from '../src/core/player_actions/player_triggered_creator';
import { SayCreator } from '../src/core/player_actions/say_creator';
import { MatchStartCreator } from '../src/core/match_status/match_start_creator';
import { RoundStartCreator } from '../src/core/match_status/round_start_creator';
import { RoundEndCreator } from '../src/core/match_status/round_end_creator';
import { GameOverCreator } from '../src/core/match_status/game_over_creator';
import { FinalAccoladeCreator } from '../src/core/match_status/final_accolade_creator';
import { TeamCreator } from '../src/core/match_status/team_creator';
import { RoundVictoryCreator } from '../src/core/match_status/round_victory_creator';
import { GameVictoryCreator } from '../src/core/match_status/game_victory_creator';
import { TestStrings } from './test_strings';
import { Event } from '../src/core/event';
import { PlayerTeamEvent } from '../src/core/player_actions/player_team_event';
import { EventGroups } from '../src/core/event_groups';
import {
  KilledKinds,
  MoneyChangeKinds,
  PlayerTriggerKinds,
  TeamKinds,
  ThrowableArmamentKinds,
  VictoryKinds,
} from '../src/models/enums';

describe('Creators tests', () => {
  function testEvent(event: Event) {
    expect(event.dateTime).to.exist;
    expect(event.logValue).not.to.be.empty;
    expect(Object.values(EventGroups)).to.contain(event.eventGroup);
  }

  function testPlayerTeamEvent(event: PlayerTeamEvent) {
    expect(event.name).not.to.be.empty;
    expect(event.steamID).not.to.be.empty;
    expect(Object.values(TeamKinds)).to.contain(event.team);
  }

  it('checks if EventCreator correctly removes matched elements', () => {
    const creator = new EventCreator();

    for (const s of TestStrings.Event) {
      // We cannot create Event abstract class
      const event = creator.createEvent();
      expect(event).to.be.false;

      const values = creator.extractValues(s);

      if (values != false) {
        testEvent({
          dateTime: values.dateTime,
          logValue: values.logValue,
          eventGroup: EventGroups.MatchStatus,
        });
      } else {
        assert.fail(
          'extractValues method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if PlayerTeamCreator correctly removes matched elements', () => {
    const creator = new PlayerTeamCreator();

    for (const s of TestStrings.PlayerTeam) {
      // We cannot create PlayerTeamEvent abstract class
      const event = creator.createEvent();
      expect(event).to.be.false;

      const values = creator.extractValues(s);

      if (values != false) {
        testPlayerTeamEvent(values);
      } else {
        assert.fail(
          'extractValues method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if PlayerSwitchedTeamCreator correctly removes matched elements', () => {
    const creator = new PlayerSwitchedTeamCreator();

    for (const s of TestStrings.PlayerSwitchedTeam) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        expect(event.from).to.exist;
        expect(event.to).to.exist;
        expect(event.playerName).not.to.be.empty;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if PickedUpCreator correctly removes matched elements', () => {
    const creator = new PickedUpCreator();

    for (const s of TestStrings.PickedUp) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        expect(event.armament).not.to.be.empty;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if DroppedCreator correctly removes matched elements', () => {
    const creator = new DroppedCreator();

    for (const s of TestStrings.Dropped) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        expect(event.armament).not.to.be.empty;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if LeftBuyZoneCreator correctly removes matched elements', () => {
    const creator = new LeftBuyZoneCreator();

    for (const s of TestStrings.LeftBuyZone) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        // If it is the last one, check if it is empty
        if (s === TestStrings.LeftBuyZone[TestStrings.LeftBuyZone.length - 1]) {
          expect(event.armaments).to.have.lengthOf(0);
        } else {
          expect(event.armaments).to.have.length.greaterThan(0);
        }
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if MoneyChangeCreator correctly removes matched elements', () => {
    const creator = new MoneyChangeCreator();

    for (const s of TestStrings.MoneyChange) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        expect(event.kind).to.exist;
        expect(event.start).to.not.be.NaN;
        expect(event.change).to.not.be.NaN;
        expect(event.total).to.not.be.NaN;
        if (event.kind === MoneyChangeKinds.Decrement) {
          expect(event.armament).to.exist.and.to.not.be.empty;
        }
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if AttackedCreator correctly removes matched elements', () => {
    const creator = new AttackedCreator();

    for (const s of TestStrings.Attacked) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        testPlayerTeamEvent(event.attackedPlayer);
        expect(event.damage.armament).not.to.be.empty;
        expect(event.damage.damageArmor).not.to.be.NaN;
        expect(event.damage.damageHealth).not.to.be.NaN;
        expect(event.damage.hitgroup).not.to.be.empty;
        expect(event.damage.remainingArmor).not.to.be.NaN;
        expect(event.damage.remainingHealth).not.to.be.NaN;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if KilledCreator correctly removes matched elements', () => {
    const creator = new KilledCreator();

    for (const s of TestStrings.Killed) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        testPlayerTeamEvent(event.killedPlayer);
        expect(event.armament).not.to.be.empty;
        if (event.kind !== undefined) {
          expect(Object.values(KilledKinds)).to.contain(event.kind);
        }
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if AssistedKillingCreator correctly removes matched elements', () => {
    const creator = new AssistedKillingCreator();

    for (const s of TestStrings.AssistedKilling) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        testPlayerTeamEvent(event.killAssistOnPlayer);
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if ThrewCreator correctly removes matched elements', () => {
    const creator = new ThrewCreator();

    for (const s of TestStrings.Threw) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        expect(Object.values(ThrowableArmamentKinds)).to.contain(
          event.armament
        );
        expect(event.entityIndex);
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if BlindedCreator correctly removes matched elements', () => {
    const creator = new BlindedCreator();

    for (const s of TestStrings.Blinded) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        testPlayerTeamEvent(event.armamentOwnerPlayer);
        expect(event.armament).to.be.string('flashbang');
        expect(event.duration.seconds).to.exist.and.not.to.be.NaN;
        expect(event.entityIndex).not.to.be.NaN;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if PlayerTriggeredCreator correctly removes matched elements', () => {
    const creator = new PlayerTriggeredCreator();

    for (const s of TestStrings.PlayerTriggered) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        expect(Object.values(PlayerTriggerKinds)).to.contain(event.kind);
        if (event.bombSite !== undefined) {
          expect(['A', 'B']).to.contain(event.bombSite);
        }
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if SayCreator correctly removes matched elements', () => {
    const creator = new SayCreator();

    for (const s of TestStrings.Say) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        testPlayerTeamEvent(event);
        expect(event.message).to.be.not.empty;
        expect(['team', 'all']).to.contain(event.kind);
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if MatchStartCreator correctly removes matched elements', () => {
    const creator = new MatchStartCreator();

    for (const s of TestStrings.MatchStart) {
      const event = creator.createEvent(s);

      if (event != false) {
        expect(event.dateTime).to.exist;
        expect(event.logValue).not.to.be.empty;
        expect(event.map).to.be.string('de_nuke');
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if RoundStartCreator correctly removes matched elements', () => {
    const creator = new RoundStartCreator();

    for (const s of TestStrings.RoundStart) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if RoundEndCreator correctly removes matched elements', () => {
    const creator = new RoundEndCreator();

    for (const s of TestStrings.RoundEnd) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if GameOverCreator correctly removes matched elements', () => {
    const creator = new GameOverCreator();

    for (const s of TestStrings.GameOver) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        expect(event.duration.minutes).to.exist.and.not.to.be.NaN;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if FinalAccoladeCreator correctly removes matched elements', () => {
    const creator = new FinalAccoladeCreator();

    for (const s of TestStrings.FinalAccolade) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        expect(event.kind).not.to.be.empty;
        expect(event.player).not.to.be.empty;
        expect(event.pos).not.to.be.NaN;
        expect(event.score).not.to.be.NaN;
        expect(event.value).not.to.be.NaN;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if TeamCreator correctly removes matched elements', () => {
    const creator = new TeamCreator();

    for (const s of TestStrings.Team) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        expect(Object.values(TeamKinds)).to.contain(event.CSGOTeam);
        expect(event.team).not.to.be.empty;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if RoundVictoryCreator correctly removes matched elements', () => {
    const creator = new RoundVictoryCreator();

    for (const s of TestStrings.RoundVictory) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        expect(Object.values(VictoryKinds)).to.contain(event.kind);
        expect(Object.values(TeamKinds)).to.contain(event.victoriousTeam);
        expect(event.score.CT).not.to.be.NaN;
        expect(event.score.Terrorist).not.to.be.NaN;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });

  it('checks if GameVictoryCreator correctly removes matched elements', () => {
    const creator = new GameVictoryCreator();

    for (const s of TestStrings.GameVictory) {
      const event = creator.createEvent(s);

      if (event != false) {
        testEvent(event);
        expect(event.teamWinner).not.to.be.empty;
      } else {
        assert.fail(
          'createEvent method must not fail with this log value: ' + s
        );
      }
    }
  });
});
