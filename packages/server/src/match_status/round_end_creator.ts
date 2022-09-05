import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { RoundEndEvent } from './round_end_event';

export class RoundEndCreator extends Creator<RoundEndEvent> {
  protected readonly regex: RegExp = Regexes.RoundEnd;

  public createEvent(value: string): false | RoundEndEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new RoundEndEvent(eventValues.logValue, eventValues.dateTime);
  }

  public extractValues(
    value: string
  ): false | Omit<RoundEndEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;
    return {};
  }
}
