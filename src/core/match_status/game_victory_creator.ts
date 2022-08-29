import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { GameVictoryEvent } from './game_victory_event';

export class GameVictoryCreator extends Creator<GameVictoryEvent> {
  protected readonly regex: RegExp = Regexes.GameVictory;

  public createEvent(value: string): false | GameVictoryEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new GameVictoryEvent(
      eventValues.logValue,
      eventValues.dateTime,
      values.teamWinner
    );
  }

  public extractValues(
    value: string
  ): false | Omit<GameVictoryEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const teamWinner = regexRes[1];

    return { teamWinner };
  }
}
