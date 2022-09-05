import { Event } from './event';
import { PlayerTeamEvent } from './player_actions/player_team_event';

export abstract class Creator<T> {
  protected abstract readonly regex: RegExp;

  public abstract createEvent(value: string): T | false;

  public abstract extractValues(
    value: string
  ):
    | Omit<T, keyof Event | keyof PlayerTeamEvent>
    | Omit<T, keyof Event>
    | false;

  protected extractValuesFromRegex(value: string): RegExpExecArray | false {
    const result = this.regex.exec(value);

    if (result === null) return false;

    return result;
  }
}
