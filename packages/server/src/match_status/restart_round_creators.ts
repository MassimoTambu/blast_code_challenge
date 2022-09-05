import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { RestartRoundEvent } from './restart_round_event';

export class RestartRoundCreator extends Creator<RestartRoundEvent> {
  protected readonly regex: RegExp = Regexes.RestartRound;

  public createEvent(value: string): false | RestartRoundEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new RestartRoundEvent(eventValues.logValue, eventValues.dateTime);
  }

  public extractValues(
    value: string
  ): false | Omit<RestartRoundEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;
    return {};
  }
}
