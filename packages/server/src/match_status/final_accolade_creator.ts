import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { FinalAccoladeEvent } from './final_accolade_event';

export class FinalAccoladeCreator extends Creator<FinalAccoladeEvent> {
  protected readonly regex: RegExp = Regexes.FinalAccolade;

  public createEvent(value: string): false | FinalAccoladeEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new FinalAccoladeEvent(
      eventValues.logValue,
      eventValues.dateTime,
      values.kind,
      values.player,
      values.value,
      values.pos,
      values.score
    );
  }

  public extractValues(
    value: string
  ): false | Omit<FinalAccoladeEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const kind = regexRes[1];
    const player = regexRes[2];
    const accoladeValue = +regexRes[3];
    const pos = +regexRes[4];
    const score = +regexRes[5];

    if (
      accoladeValue === undefined ||
      pos === undefined ||
      score === undefined
    ) {
      return false;
    }

    return { kind, player, value: accoladeValue, pos, score };
  }
}
