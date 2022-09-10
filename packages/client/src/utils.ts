import { TeamKinds, VictoryKinds } from 'shared/models/enums';
import { Score } from 'shared/models/score';
import { KDAStats } from 'shared/models/stats/kda_stats';
import { PlayerStats } from 'shared/models/stats/player_stats';

export function sumKDA(players: PlayerStats[]): KDAStats {
  return players
    .map((p) => p.kda)
    .reduce(
      (acc, kda) => {
        return {
          assists: acc.assists + kda.assists,
          deaths: acc.deaths + kda.deaths,
          kills: acc.kills + kda.kills,
        };
      },
      { assists: 0, kills: 0, deaths: 0 }
    );
}

export function stringifyKDA(kda: KDAStats) {
  return `${kda.kills} / ${kda.deaths} / ${kda.assists}`;
}

export function stringifyDeathsPerRound(deathsPerRound: {
  number: number;
  CT: number;
  Terrorist: number;
}) {
  return `CT: ${deathsPerRound.CT} | T: ${deathsPerRound.Terrorist}`;
}

export function stringifyTeamWinner(roundWonCondition: {
  number: number;
  winnerCSGOTeam: TeamKinds;
  teamPlayingCT: string;
  teamPlayingTerrorists: string;
  winCondition: VictoryKinds;
  score: Score;
}): string {
  if (roundWonCondition.winnerCSGOTeam === TeamKinds.CT) {
    return `${roundWonCondition.teamPlayingCT} (CT)`;
  } else {
    return `${roundWonCondition.teamPlayingTerrorists} (Terrorist)`;
  }
}

export function stringifyWinCondition(victoryKind: VictoryKinds): string {
  switch (victoryKind) {
    case VictoryKinds.BombDefused:
      return 'Bomb defused';
    case VictoryKinds.BombExploded:
      return 'Bomb exploded';
    case VictoryKinds.CTACE:
      return 'CT ACE';
    case VictoryKinds.TerroristACE:
      return 'Terrorist ACE';
    default:
      return '';
  }
}

export function approxDecimals(value: number): number {
  return Math.round(value * 10) / 10;
}
