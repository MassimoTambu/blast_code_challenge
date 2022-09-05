import { HitGroupKinds } from '../enums';

export type HitCounterStats = { [key in HitGroupKinds]: number };

export interface HitCounterStatsWithFatalHeadshots {
  hitCounterStats: HitCounterStats;
  fatalHeadshots: number;
}
