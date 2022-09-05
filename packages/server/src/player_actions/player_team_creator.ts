import { TeamKinds } from 'shared/models/enums';
import { Creator } from '../creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { PlayerTeamEvent } from './player_team_event';

export class PlayerTeamCreator extends Creator<PlayerTeamEvent> {
  protected readonly regex: RegExp = Regexes.PlayerTeam;

  // We cannot create an PlayerTeamEvent because it is an abstract class
  public createEvent(): false {
    return false;
  }

  public extractValues(
    value: string
  ): false | Omit<PlayerTeamEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const name = regexRes[1];
    const steamID = regexRes[3];
    const team = enumFromStringValue(TeamKinds, regexRes[4]);

    if (team === undefined) return false;

    return { name, steamID, team };
  }
}

export const PLAYER_TEAM_CREATOR = new PlayerTeamCreator();
