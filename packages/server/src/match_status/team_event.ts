import { TeamKinds } from 'shared/models/enums';
import { Event } from '../event';
import { EventGroups } from 'shared/models/enums';

export class TeamEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly CSGOTeam: TeamKinds,
    public readonly team: string
  ) {}
}
