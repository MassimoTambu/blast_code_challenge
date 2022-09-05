import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { PlayerTeamEvent } from './player_team_event';
import { SayEvent } from './say_event';

export class SayCreator extends Creator<SayEvent> {
  protected readonly regex: RegExp = Regexes.Say;

  public createEvent(value: string): false | SayEvent {
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

    return new SayEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.message,
      values.kind
    );
  }

  public extractValues(
    value: string
  ): false | Omit<SayEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    let kindToConvert: string;
    let message: string;

    // Is a say to all regex
    if (regexRes[3] === undefined) {
      kindToConvert = regexRes[1];
      message = regexRes[2];
    }
    // Is a say to team regex
    else {
      kindToConvert = regexRes[3];
      message = regexRes[4];
    }

    if (kindToConvert !== 'say' && kindToConvert !== 'say_team') {
      return false;
    }
    const kind = kindToConvert === 'say' ? 'all' : 'team';

    return { kind, message };
  }
}
