import { Event } from '../event';
import { EventGroups } from '../../models/enums';

export class RestartRoundEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date
  ) {}
}