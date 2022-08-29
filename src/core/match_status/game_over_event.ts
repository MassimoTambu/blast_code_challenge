import { Duration } from '../../models/duration';
import { Event } from '../event';
import { EventGroups } from '../event_groups';

export class GameOverEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly duration: Duration
  ) {}
}
