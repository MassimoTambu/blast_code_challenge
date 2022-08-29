import { TeamKinds } from '../../models/enums';

export abstract class PlayerTeamEvent {
  public abstract readonly name: string;
  public abstract readonly steamID: string;
  public abstract readonly team: TeamKinds;
}
