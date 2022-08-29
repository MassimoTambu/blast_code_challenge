import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { LeftBuyZoneEvent } from './left_buy_zone_event';
import { PlayerTeamEvent } from './player_team_event';

export class LeftBuyZoneCreator extends Creator<LeftBuyZoneEvent> {
  protected readonly regex: RegExp = Regexes.LeftBuyZone;

  public createEvent(value: string): false | LeftBuyZoneEvent {
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

    return new LeftBuyZoneEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.armaments
    );
  }

  public extractValues(
    value: string
  ): false | Omit<LeftBuyZoneEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    // Removes the first result and finds if every results are undefined
    if (regexRes.slice(1).every((r) => r === undefined)) {
      return { armaments: [] };
    }

    const armaments = regexRes[1].split(' ');

    return { armaments };
  }
}
