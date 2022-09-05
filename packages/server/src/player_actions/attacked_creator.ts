import { Damage } from 'shared/models/damage';
import { HitGroupKinds, TeamKinds } from 'shared/models/enums';
import { Creator } from '../creator';
import { EVENT_CREATOR } from '../event_creator';
import { PLAYER_TEAM_CREATOR } from './player_team_creator';
import { enumFromStringValue } from '../enum_utils';
import { Event } from '../event';
import { Regexes } from '../regexes';
import { AttackedEvent } from './attacked_event';
import { PlayerTeamEvent } from './player_team_event';

export class AttackedCreator extends Creator<AttackedEvent> {
  protected readonly regex: RegExp = Regexes.Attacked;

  public createEvent(value: string): false | AttackedEvent {
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

    return new AttackedEvent(
      eventValues.logValue,
      eventValues.dateTime,
      playerTeamValues.name,
      playerTeamValues.steamID,
      playerTeamValues.team,
      values.attackedPlayer,
      values.damage
    );
  }

  public extractValues(
    value: string
  ): false | Omit<AttackedEvent, keyof Event | keyof PlayerTeamEvent> {
    const regexRes = this.extractValuesFromRegex(value);

    if (regexRes === false) return false;

    const team = enumFromStringValue(TeamKinds, regexRes[4]);

    if (team === undefined) return false;

    const attackedPlayer: PlayerTeamEvent = {
      name: regexRes[1],
      steamID: regexRes[3],
      team,
    };

    const armament = regexRes[5];
    const damageHealth = +regexRes[6];
    const damageArmor = +regexRes[7];
    const remainingHealth = +regexRes[8];
    const remainingArmor = +regexRes[9];
    const hitgroup = enumFromStringValue(HitGroupKinds, regexRes[10]);

    if (
      [damageHealth, damageArmor, remainingHealth, remainingArmor].some((x) =>
        isNaN(x)
      ) ||
      hitgroup === undefined
    ) {
      return false;
    }

    const damage: Damage = {
      armament,
      damageHealth,
      damageArmor,
      remainingHealth,
      remainingArmor,
      hitgroup,
    };

    return { attackedPlayer, damage };
  }
}
