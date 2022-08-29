import { Creator } from './creator';
import { Event } from './event';
import { FinalAccoladeCreator } from './match_status/final_accolade_creator';
import { GameOverCreator } from './match_status/game_over_creator';
import { GameVictoryCreator } from './match_status/game_victory_creator';
import { MatchStartCreator } from './match_status/match_start_creator';
import { RoundEndCreator } from './match_status/round_end_creator';
import { RoundStartCreator } from './match_status/round_start_creator';
import { RoundVictoryCreator } from './match_status/round_victory_creator';
import { TeamCreator } from './match_status/team_creator';
import { AssistedKillingCreator } from './player_actions/assisted_killing_creator';
import { AttackedCreator } from './player_actions/attacked_creator';
import { BlindedCreator } from './player_actions/blinded_creator';
import { DroppedCreator } from './player_actions/dropped_creator';
import { KilledCreator } from './player_actions/killed_creator';
import { LeftBuyZoneCreator } from './player_actions/left_buy_zone_creator';
import { MoneyChangeCreator } from './player_actions/money_change_creator';
import { PickedUpCreator } from './player_actions/picked_up_creator';
import { PlayerSwitchedTeamCreator } from './player_actions/player_switched_team_creator';
import { PlayerTriggeredCreator } from './player_actions/player_triggered_creator';
import { SayCreator } from './player_actions/say_creator';
import { ThrewCreator } from './player_actions/threw_creator';

const PLAYER_SWITCHED_TEAM_CREATOR = new PlayerSwitchedTeamCreator();
const PICKED_UP_CREATOR = new PickedUpCreator();
const DROPPED_CREATOR = new DroppedCreator();
const LEFT_BUY_ZONE_CREATOR = new LeftBuyZoneCreator();
const MONEY_CHANGE_CREATOR = new MoneyChangeCreator();
const ATTACKED_CREATOR = new AttackedCreator();
const KILLED_CREATOR = new KilledCreator();
const ASSISTED_KILLING_CREATOR = new AssistedKillingCreator();
const THREW_CREATOR = new ThrewCreator();
const BLINDED_CREATOR = new BlindedCreator();
const PLAYER_TRIGGERED_CREATOR = new PlayerTriggeredCreator();
const SAY_CREATOR = new SayCreator();
const MATCH_START_CREATOR = new MatchStartCreator();
const ROUND_START_CREATOR = new RoundStartCreator();
const ROUND_END_CREATOR = new RoundEndCreator();
const GAME_OVER_CREATOR = new GameOverCreator();
const FINAL_ACCOLADE_CREATOR = new FinalAccoladeCreator();
const TEAM_CREATOR = new TeamCreator();
const ROUND_VICTORY_CREATOR = new RoundVictoryCreator();
const GAME_VICTORY_CREATOR = new GameVictoryCreator();

export const CREATORS: Creator<Event>[] = [
  // * We need to put SAY_CREATOR before the others to prevent taking unexpected events from players' messages
  SAY_CREATOR,
  PLAYER_SWITCHED_TEAM_CREATOR,
  PICKED_UP_CREATOR,
  DROPPED_CREATOR,
  LEFT_BUY_ZONE_CREATOR,
  MONEY_CHANGE_CREATOR,
  ATTACKED_CREATOR,
  KILLED_CREATOR,
  ASSISTED_KILLING_CREATOR,
  THREW_CREATOR,
  BLINDED_CREATOR,
  PLAYER_TRIGGERED_CREATOR,
  MATCH_START_CREATOR,
  ROUND_START_CREATOR,
  ROUND_END_CREATOR,
  GAME_OVER_CREATOR,
  FINAL_ACCOLADE_CREATOR,
  TEAM_CREATOR,
  ROUND_VICTORY_CREATOR,
  GAME_VICTORY_CREATOR,
];
