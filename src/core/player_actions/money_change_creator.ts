import { MoneyChangeKinds } from '../../models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { MoneyChangeEvent } from './money_change_event';
import { PlayerTeamEvent } from './player_team_event';

export class MoneyChangeCreator extends Creator<MoneyChangeEvent> {
  protected readonly regex: RegExp = Regexes.MoneyChange;

  public createEvent(value: string): false | MoneyChangeEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const playerTeamValues = PLAYER_TEAM_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (
      eventValues === false ||
      playerTeamValues === false ||
      values === false
    ) {
      return false;
    }

    return new MoneyChangeEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.start,
      values.change,
      values.total,
      values.kind,
      values.armament
    );
  }

  public extractValues(
    value: string
  ): false | Omit<MoneyChangeEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    let start: number;
    let change: number;
    let total: number;
    let kind: MoneyChangeKinds | undefined;
    let armament: string | undefined;

    // Is a money change of increment kind
    if (regexRes[5] === undefined) {
      start = +regexRes[1];
      change = +regexRes[3];
      total = +regexRes[4];
      kind = regexRes[2] === '+' ? MoneyChangeKinds.Increment : undefined;
    }
    // Is a money change of decrement kind
    else {
      start = +regexRes[5];
      change = +regexRes[7];
      total = +regexRes[8];
      kind = regexRes[6] === '-' ? MoneyChangeKinds.Decrement : undefined;
      armament = regexRes.at(9);
    }

    if ([start, change, total].some((x) => isNaN(x)) || kind === undefined) {
      return false;
    }

    return { start, change, total, kind, armament };
  }
}
