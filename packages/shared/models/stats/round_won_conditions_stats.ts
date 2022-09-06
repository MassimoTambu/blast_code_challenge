import { VictoryKinds } from '../enums';

export interface RoundWonConditionsStats {
  counters: RoundWonConditions;
}

type RoundWonConditions = { [key in VictoryKinds]: number };
