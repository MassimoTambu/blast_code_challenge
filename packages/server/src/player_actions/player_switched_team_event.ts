import { TeamKinds } from 'shared/models/enums';
import { Event } from '../event';
import { EventGroups } from 'shared/models/enums';

export class PlayerSwitchedTeamEvent implements Event {
  public readonly eventGroup = EventGroups.PlayerAction;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly playerName: string,
    public readonly from: TeamKinds,
    public readonly to: TeamKinds
  ) {}
}
