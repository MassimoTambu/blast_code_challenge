import { ArmamentStats } from './armament_stats';
import { BlindedStats } from './blinded_stats';
import { HitCounterStatsWithFatalHeadshots } from './hit_counter_stats';
import { HitHeadshotPercentageStats } from './hit_headshot_percentage_stats';
import { KDAStats } from './kda_stats';
import { KillHeadshotPercentageStats } from './kill_headshot_percentage_stats';
import { MolotovStats } from './molotov_stats';
import { PlayerBombStats } from './player_bomb_stats';

export interface PlayerStats {
  name: string;
  team: string;
  armamentsBought: ArmamentStats[];
  hitCounter: {
    dealt: HitCounterStatsWithFatalHeadshots;
    sustained: HitCounterStatsWithFatalHeadshots;
  };
  kda: KDAStats;
  killHeadshotPercentage: KillHeadshotPercentageStats;
  hitHeadshotPercentage: HitHeadshotPercentageStats;
  bombs: PlayerBombStats;
  blinded: BlindedStats;
  molotovDamage: MolotovStats;
}
