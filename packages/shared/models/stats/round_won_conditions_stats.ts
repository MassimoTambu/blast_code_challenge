import { TeamKinds, VictoryKinds } from '../enums';
import { Score } from '../score';

export interface RoundWonConditionsStats {
  rounds: {
    number: number;
    winnerCSGOTeam: TeamKinds;
    teamPlayingCT: string;
    teamPlayingTerrorists: string;
    winCondition: VictoryKinds;
    score: Score;
  }[];
}
