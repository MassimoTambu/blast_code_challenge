import { Creator } from './creator';
import { Event } from './event';
import { Regexes } from './regexes';

export class EventCreator extends Creator<Event> {
  protected regex: RegExp = Regexes.Event;

  public extractValues(value: string): false | Omit<Event, 'eventGroup'> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const year = +regexRes[3];
    const month = +regexRes[1];
    const day = +regexRes[2];
    const hours = +regexRes[4];
    const minutes = +regexRes[5];
    const seconds = +regexRes[6];

    if ([year, month, day, hours, minutes, seconds].some((n) => isNaN(n))) {
      return false;
    }

    return {
      dateTime: new Date(year, month, day, hours, minutes, seconds),
      logValue: value,
    };
  }

  // We cannot create an Event because it is an abstract class
  public createEvent(): false {
    return false;
  }
}

export const EVENT_CREATOR = new EventCreator();
