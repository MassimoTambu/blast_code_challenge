import { Duration } from '../../models/duration';
import { TeamKinds } from '../../models/enums';
import { Event } from '../event';
import { EventGroups } from '../event_groups';
import { PlayerTeamEvent } from './player_team_event';

export class BlindedEvent implements Event, PlayerTeamEvent {
  public readonly eventGroup = EventGroups.PlayerAction;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly name: string,
    public readonly steamID: string,
    public readonly team: TeamKinds,
    public readonly entityIndex: number,
    public readonly armament: 'flashbang',
    public readonly duration: Duration,
    public readonly armamentOwnerPlayer: PlayerTeamEvent
  ) {}
}