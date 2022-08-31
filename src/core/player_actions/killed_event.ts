import { KilledKinds, TeamKinds } from '../../models/enums';
import { Event } from '../event';
import { EventGroups } from '../../models/enums';
import { PlayerTeamEvent } from './player_team_event';

export class KilledEvent implements Event, PlayerTeamEvent {
  public readonly eventGroup = EventGroups.PlayerAction;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly name: string,
    public readonly steamID: string,
    public readonly team: TeamKinds,
    public readonly killedPlayer: PlayerTeamEvent,
    public readonly armament: string,
    public readonly kind?: KilledKinds
  ) {}
}
