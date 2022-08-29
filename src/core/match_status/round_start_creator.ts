import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { RoundStartEvent } from './round_start_event';

export class RoundStartCreator extends Creator<RoundStartEvent> {
  protected readonly regex: RegExp = Regexes.RoundStart;

  public createEvent(value: string): false | RoundStartEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new RoundStartEvent(eventValues.logValue, eventValues.dateTime);
  }

  public extractValues(
    value: string
  ): false | Omit<RoundStartEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;
    return {};
  }
}
