import { TeamKinds, VictoryKinds } from '../../models/enums';
import { Score } from '../../models/score';
import { Event } from '../event';
import { EventGroups } from '../../models/enums';

export class RoundVictoryEvent implements Event {
  public readonly eventGroup = EventGroups.MatchStatus;

  public constructor(
    public readonly logValue: string,
    public readonly dateTime: Date,
    public readonly victoriousTeam: TeamKinds,
    public readonly kind: VictoryKinds,
    public readonly score: Score
  ) {}
}
