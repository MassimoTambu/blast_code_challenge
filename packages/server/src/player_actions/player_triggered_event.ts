import { PlayerTriggerKinds, TeamKinds } from 'shared/models/enums';
import { Event } from '../event';
import { EventGroups } from 'shared/models/enums';
import { PlayerTeamEvent } from './player_team_event';

export class PlayerTriggeredEvent implements Event, PlayerTeamEvent {
  public readonly eventGroup = EventGroups.PlayerAction;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly name: string,
    public readonly steamID: string,
    public readonly team: TeamKinds,
    public readonly kind: PlayerTriggerKinds,
    /** Not null if kind = Bomb_Begin_Plant | Planted_The_Bomb */
    public readonly bombSite?: 'A' | 'B'
  ) {}
}
