import { Event } from '../event';
import { EventGroups } from '../event_groups';

export class RoundEndEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date
  ) {}
}