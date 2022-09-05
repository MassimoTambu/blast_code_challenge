import { PlayerTriggerKinds } from 'shared/models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { PlayerTeamEvent } from './player_team_event';
import { PlayerTriggeredEvent } from './player_triggered_event';

export class PlayerTriggeredCreator extends Creator<PlayerTriggeredEvent> {
  protected readonly regex: RegExp = Regexes.PlayerTriggered;

  public createEvent(value: string): false | PlayerTriggeredEvent {
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

    return new PlayerTriggeredEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.kind,
      values.bombSite
    );
  }

  public extractValues(
    value: string
  ): false | Omit<PlayerTriggeredEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    let kind: PlayerTriggerKinds | undefined;
    let bombSite: string | undefined;

    // Is PlayerTriggered with bombSite data
    if (regexRes[3] === undefined) {
      kind = enumFromStringValue(PlayerTriggerKinds, regexRes[1]);
      bombSite = regexRes.at(2);
    }
    // Is PlayerTriggered without bombSite data
    else {
      kind = enumFromStringValue(PlayerTriggerKinds, regexRes[3]);
    }

    if (
      kind === undefined ||
      (bombSite !== undefined && bombSite !== 'A' && bombSite !== 'B')
    ) {
      return false;
    }

    return { kind, bombSite };
  }
}
