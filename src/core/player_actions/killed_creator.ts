import { KilledKinds, TeamKinds } from '../../models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { KilledEvent } from './killed_event';
import { PlayerTeamEvent } from './player_team_event';

export class KilledCreator extends Creator<KilledEvent> {
  protected readonly regex: RegExp = Regexes.Killed;

  public createEvent(value: string): false | KilledEvent {
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

    return new KilledEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.killedPlayer,
      values.armament,
      values.kind
    );
  }

  public extractValues(
    value: string
  ): false | Omit<KilledEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    let killedPlayer: PlayerTeamEvent;
    let armament: string;
    // * Killed kind could be unspecified
    let kind: KilledKinds | undefined;
    let team: TeamKinds | undefined;

    // It is a killed regex with Killed kind
    if (regexRes[7] === undefined) {
      team = enumFromStringValue(TeamKinds, regexRes[4]);
      if (team === undefined) {
        return false;
      }

      killedPlayer = {
        name: regexRes[1],
        steamID: regexRes[3],
        team,
      };

      armament = regexRes[5];
      kind = enumFromStringValue(KilledKinds, regexRes[6]);
    }
    // It is a killed regex without Killed kind
    else {
      team = enumFromStringValue(TeamKinds, regexRes[10]);
      if (team === undefined) {
        return false;
      }

      killedPlayer = {
        name: regexRes[7],
        steamID: regexRes[9],
        team,
      };
      armament = regexRes[11];
    }

    return { armament, killedPlayer, kind };
  }
}
