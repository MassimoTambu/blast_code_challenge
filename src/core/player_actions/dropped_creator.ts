import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { DroppedEvent } from './dropped_event';
import { PlayerTeamEvent } from './player_team_event';

export class DroppedCreator extends Creator<DroppedEvent> {
  protected readonly regex: RegExp = Regexes.Dropped;

  public createEvent(value: string): false | DroppedEvent {
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

    return new DroppedEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.armament
    );
  }

  public extractValues(
    value: string
  ): false | Omit<DroppedEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const armament = regexRes[1];

    return { armament };
  }
}
