/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { TeamKinds, VictoryKinds } from 'shared/models/enums';
import { Score } from 'shared/models/score';
import { GameDataContext } from '../providers';
import ParagraphTitle from './paragraph_title';

function stringifyTeamWinner(roundWonCondition: {
  number: number;
  winnerCSGOTeam: TeamKinds;
  teamPlayingCT: string;
  teamPlayingTerrorists: string;
  winCondition: VictoryKinds;
  score: Score;
}): string {
  if (roundWonCondition.winnerCSGOTeam === TeamKinds.CT) {
    return `${roundWonCondition.teamPlayingCT}(CT)`;
  } else {
    return `${roundWonCondition.teamPlayingTerrorists}(Terrorist)`;
  }
}

function stringifyWinCondition(victoryKind: VictoryKinds): string {
  switch (victoryKind) {
    case VictoryKinds.BombDefused:
      return 'Bomb defused';
    case VictoryKinds.BombExploded:
      return 'Bomb exploded';
    case VictoryKinds.CTACE:
      return 'CT ACE';
    case VictoryKinds.TerroristACE:
      return 'Terrorist ACE';
    default:
      return '';
  }
}

export default function Rounds() {
  const gameData = useContext(GameDataContext);

  return (
    <>
      <ParagraphTitle name="Rounds Stats" />
      <Typography component={'div'} align={'left'}>
        <>
          Round{' '}
          <Typography component={'span'} fontWeight={'bold'}>
            {gameData.roundsResults.longestRound.number}
          </Typography>{' '}
          was the longest, with a duration of{' '}
          <Typography component={'span'} fontWeight={'bold'}>
            {gameData.roundsResults.longestRound.seconds}
          </Typography>{' '}
          seconds
        </>
      </Typography>
      <Typography component={'div'} align={'left'}>
        <>
          Round{' '}
          <Typography component={'span'} fontWeight={'bold'}>
            {gameData.roundsResults.shortestRound.number}
          </Typography>{' '}
          was the shortest, with a duration of{' '}
          <Typography component={'span'} fontWeight={'bold'}>
            {gameData.roundsResults.shortestRound.seconds}
          </Typography>{' '}
          seconds
        </>
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Round n°</TableCell>
              <TableCell>Team Playing CT</TableCell>
              <TableCell>Team Playing Terrorist</TableCell>
              <TableCell>Winner</TableCell>
              <TableCell>Win condition</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>CT Money</TableCell>
              <TableCell>Terrorist Money</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameData.roundWonConditions.rounds.map((roundWonCondition) => {
              const moneySpent = gameData.moneySpentPerRound.rounds.find(
                (r) => r.number === roundWonCondition.number
              )!;

              const winner = stringifyTeamWinner(roundWonCondition);
              const winCondition = stringifyWinCondition(
                roundWonCondition.winCondition
              );
              const score = `CT: ${roundWonCondition.score.CT} | T: ${roundWonCondition.score.Terrorist}`;

              return (
                <TableRow
                  key={`Round#${roundWonCondition.number}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {roundWonCondition.number}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {roundWonCondition.teamPlayingCT}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {roundWonCondition.teamPlayingTerrorists}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {winner}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {winCondition}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {score}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moneySpent.CTMoney}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moneySpent.TerroristMoney}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>{firstTeam}</TableCell>
              <TableCell>{stringifyKDA(firstTeamKDA)}</TableCell>
              <TableCell>{firstTeamMoney}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firstTeamPlayers.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{stringifyKDA(row.kda)}</TableCell>
                <TableCell>{row.name === MVP ? 'MVP' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Divider
            component={'thead'}
            sx={{ width: '100%', display: 'table-row' }}
          />
          <TableHead>
            <TableRow>
              <TableCell>{secondTeam}</TableCell>
              <TableCell>{stringifyKDA(secondTeamKDA)}</TableCell>
              <TableCell>{secondTeamMoney}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {secondTeamPlayers.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{stringifyKDA(row.kda)}</TableCell>
                <TableCell>{row.name === MVP ? 'MVP' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
