import { Duration } from 'shared/models/duration';
import { TeamKinds } from 'shared/models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { BlindedEvent } from './blinded_event';
import { PlayerTeamEvent } from './player_team_event';

export class BlindedCreator extends Creator<BlindedEvent> {
  protected readonly regex: RegExp = Regexes.Blinded;

  public createEvent(value: string): false | BlindedEvent {
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

    return new BlindedEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.entityIndex,
      values.armament,
      values.duration,
      values.armamentOwnerPlayer
    );
  }

  public extractValues(
    value: string
  ): false | Omit<BlindedEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const duration: Duration = { seconds: +regexRes[1] };

    const team = enumFromStringValue(TeamKinds, regexRes[5]);

    if (team === undefined) return false;

    const armamentOwnerPlayer: PlayerTeamEvent = {
      name: regexRes[2],
      steamID: regexRes[4],
      team,
    };
    const armament = regexRes[6];
    const entityIndex = +regexRes[7];

    if (
      armament !== 'flashbang' ||
      duration.seconds === undefined ||
      isNaN(duration.seconds) ||
      isNaN(entityIndex)
    ) {
      return false;
    }

    return { duration, armament, armamentOwnerPlayer, entityIndex };
  }
}
