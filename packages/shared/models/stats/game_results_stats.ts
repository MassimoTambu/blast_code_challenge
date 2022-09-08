import { Duration } from '../duration';

export interface GameResultsStats {
  map: string;
  startDate: string;
  duration: Duration;
  teamWinner: string;
}
