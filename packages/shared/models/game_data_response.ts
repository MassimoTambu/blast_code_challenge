import { ArmamentStats } from './stats/armament_stats';
import { GameResultsStats } from './stats/game_results_stats';
import { HitCounterStatsWithFatalHeadshots } from './stats/hit_counter_stats';
import { MVPStats } from './stats/mvp_stats';
import { PlayerStats } from './stats/player_stats';
import { PlayerWithKillsStats } from './stats/player_with_kills_stats';
import { PlayerWithMoneyStats } from './stats/player_with_money_stats';
import { RoundWonConditionsStats } from './stats/round_won_conditions_stats';

export interface GameDataResponse {
  gameResults: GameResultsStats;
  playerWithTheMostKills: PlayerWithKillsStats;
  playerWithTheMostMoney: PlayerWithMoneyStats;
  hitCounter: HitCounterStatsWithFatalHeadshots;
  mvp: MVPStats;
  roundWonConditions: RoundWonConditionsStats;
  armamentBought: ArmamentStats[];
  players: PlayerStats[];
}
