import { TeamKinds } from 'shared/models/enums';
import { EVENT_CREATOR } from '../event_creator';
import { Creator } from '../creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { PlayerSwitchedTeamEvent } from './player_switched_team_event';

export class PlayerSwitchedTeamCreator extends Creator<PlayerSwitchedTeamEvent> {
  protected readonly regex: RegExp = Regexes.PlayerSwitchedTeam;

  public createEvent(value: string): false | PlayerSwitchedTeamEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) return false;
    return new PlayerSwitchedTeamEvent(
      eventValues.logValue,
      eventValues.dateTime,
      values.playerName,
      values.from,
      values.to
    );
  }

  public extractValues(
    value: string
  ): false | Omit<PlayerSwitchedTeamEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const playerName = regexRes[1];
    const from = enumFromStringValue(TeamKinds, regexRes[2]);
    const to = enumFromStringValue(TeamKinds, regexRes[3]);

    if (from === undefined || to === undefined) return false;

    return { playerName, from, to };
  }
}
