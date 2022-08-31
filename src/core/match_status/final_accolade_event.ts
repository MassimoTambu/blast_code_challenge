import { Event } from '../event';
import { EventGroups } from '../../models/enums';

export class FinalAccoladeEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly kind: string,
    public readonly player: string,
    public readonly value: number,
    public readonly pos: number,
    public readonly score: number
  ) {}
}
