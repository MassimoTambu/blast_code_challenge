import { Duration } from 'shared/models/duration';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { GameOverEvent } from './game_over_event';

export class GameOverCreator extends Creator<GameOverEvent> {
  protected readonly regex: RegExp = Regexes.GameOver;

  public createEvent(value: string): false | GameOverEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new GameOverEvent(
      eventValues.logValue,
      eventValues.dateTime,
      values.duration
    );
  }

  public extractValues(
    value: string
  ): false | Omit<GameOverEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const duration: Duration = { minutes: +regexRes[1] };

    if (duration.minutes === undefined || isNaN(duration.minutes)) {
      return false;
    }

    return { duration };
  }
}
