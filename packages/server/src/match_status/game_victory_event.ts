import { EventGroups } from 'shared/models/enums';
import { Event } from '../event';

export class GameVictoryEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly teamWinner: string
  ) {}
}
