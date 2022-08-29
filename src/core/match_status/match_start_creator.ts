import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { MatchStartEvent } from './match_start_event';

export class MatchStartCreator extends Creator<MatchStartEvent> {
  protected readonly regex: RegExp = Regexes.MatchStart;

  public createEvent(value: string): false | MatchStartEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new MatchStartEvent(
      eventValues.logValue,
      eventValues.dateTime,
      values.map
    );
  }

  public extractValues(
    value: string
  ): false | Omit<MatchStartEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const map = regexRes[1];

    return { map };
  }
}
