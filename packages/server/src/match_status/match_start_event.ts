import { Event } from '../event';
import { EventGroups } from 'shared/models/enums';

export class MatchStartEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly map: string
  ) {}
}
