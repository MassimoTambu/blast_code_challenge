import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { Creator } from '../creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { PickedUpEvent } from './picked_up_event';
import { PlayerTeamEvent } from './player_team_event';

export class PickedUpCreator extends Creator<PickedUpEvent> {
  protected readonly regex: RegExp = Regexes.PickedUp;

  public createEvent(value: string): false | PickedUpEvent {
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

    return new PickedUpEvent(
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
  ): false | Omit<PickedUpEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const armament = regexRes[1];

    return { armament };
  }
}
