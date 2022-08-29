import { TeamKinds } from '../../models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { AssistedKillingEvent } from './assisted_killing_event';
import { PlayerTeamEvent } from './player_team_event';

export class AssistedKillingCreator extends Creator<AssistedKillingEvent> {
  protected readonly regex: RegExp = Regexes.AssistedKilling;

  public createEvent(value: string): false | AssistedKillingEvent {
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

    return new AssistedKillingEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.killAssistOnPlayer
    );
  }

  public extractValues(
    value: string
  ): false | Omit<AssistedKillingEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const team = enumFromStringValue(TeamKinds, regexRes[4]);

    if (team === undefined) return false;

    const killAssistOnPlayer: PlayerTeamEvent = {
      name: regexRes[1],
      steamID: regexRes[3],
      team,
    };

    return { killAssistOnPlayer };
  }
}
