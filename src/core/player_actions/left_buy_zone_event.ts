import { TeamKinds } from '../../models/enums';
import { Event } from '../event';
import { EventGroups } from '../event_groups';
import { PlayerTeamEvent } from './player_team_event';

export class LeftBuyZoneEvent implements Event, PlayerTeamEvent {
  public readonly eventGroup = EventGroups.PlayerAction;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly name: string,
    public readonly steamID: string,
    public readonly team: TeamKinds,
    public readonly armaments: string[]
  ) {}
}
