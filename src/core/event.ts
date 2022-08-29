import { EventGroups } from './event_groups';

export abstract class Event {
  public abstract readonly eventGroup: EventGroups;
  public abstract readonly logValue: string;
  public abstract readonly dateTime: Date;
}
