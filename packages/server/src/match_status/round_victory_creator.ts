import { TeamKinds, VictoryKinds } from 'shared/models/enums';
import { Score } from 'shared/models/score';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { RoundVictoryEvent } from './round_victory_event';

export class RoundVictoryCreator extends Creator<RoundVictoryEvent> {
  protected readonly regex: RegExp = Regexes.RoundVictory;

  public createEvent(value: string): false | RoundVictoryEvent {
    const eventValues = EVENT_CREATOR.extractValues(value);
    const values = this.extractValues(value);

    if (eventValues === false || values === false) {
      return false;
    }

    return new RoundVictoryEvent(
      eventValues.logValue,
      eventValues.dateTime,
      values.victoriousTeam,
      values.kind,
      values.score
    );
  }

  public extractValues(
    value: string
  ): false | Omit<RoundVictoryEvent, keyof Event> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const victoriousTeam = enumFromStringValue(TeamKinds, regexRes[1]);
    const kind = enumFromStringValue(VictoryKinds, regexRes[2]);
    let ct: number, terrorist: number;

    if (regexRes[3] === 'CT') {
      ct = +regexRes[4];
      terrorist = +regexRes[6];
    } else {
      ct = +regexRes[6];
      terrorist = +regexRes[4];
    }

    const score: Score = {
      CT: ct,
      Terrorist: terrorist,
    };

    if (
      victoriousTeam === undefined ||
      kind === undefined ||
      isNaN(score.CT) ||
      isNaN(score.Terrorist)
    ) {
      return false;
    }

    return { victoriousTeam, kind, score };
  }
}
