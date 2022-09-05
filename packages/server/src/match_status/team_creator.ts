import { TeamKinds } from 'shared/models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { TeamEvent } from './team_event';

export class TeamCreator extends Creator<TeamEvent> {
  protected readonly regex: RegExp = Regexes.Team;

  public createEvent(value: string): false | TeamEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new TeamEvent(
      eventValues.logValue,
      eventValues.dateTime,
      values.CSGOTeam,
      values.team
    );
  }

  public extractValues(value: string): false | Omit<TeamEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const CSGOTeam = enumFromStringValue(TeamKinds, regexRes[1]);
    const team = regexRes[2];

    if (CSGOTeam === undefined) {
      return false;
    }

    return { CSGOTeam, team };
  }
}
