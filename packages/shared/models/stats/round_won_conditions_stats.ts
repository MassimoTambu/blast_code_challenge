import { TeamKinds, VictoryKinds } from '../enums';

export interface RoundWonConditionsStats {
  rounds: {
    number: number;
    winnerCSGOTeam: TeamKinds;
    wonCondition: VictoryKinds;
  }[];
}
