import { ThrowableArmamentKinds } from '../../models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { PlayerTeamEvent } from './player_team_event';
import { ThrewEvent } from './threw_event';

export class ThrewCreator extends Creator<ThrewEvent> {
  protected readonly regex: RegExp = Regexes.Threw;

  public createEvent(value: string): false | ThrewEvent {
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

    return new ThrewEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.armament,
      values.entityIndex
    );
  }

  public extractValues(
    value: string
  ): false | Omit<ThrewEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    let armament: ThrowableArmamentKinds | undefined;
    let entityIndexToConvert: string | undefined;

    // Is a flashbang due to entindex presence
    if (regexRes[3] === undefined) {
      entityIndexToConvert = regexRes[2];
      armament = enumFromStringValue(ThrowableArmamentKinds, regexRes[1]);
    }
    // Is another throwable armament
    else {
      armament = enumFromStringValue(ThrowableArmamentKinds, regexRes[3]);
    }

    if (armament === undefined) return false;

    let entityIndex: number | undefined;
    if (entityIndexToConvert !== undefined) {
      entityIndex = +entityIndexToConvert;

      if (isNaN(entityIndex)) return false;
    }

    return { armament, entityIndex };
  }
}
