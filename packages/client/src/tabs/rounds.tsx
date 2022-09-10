/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
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
import BoxCenter from '../components/box_center';
import ParagraphTitle from '../components/paragraph_title';
import { Column } from '../models/column';
import { GameDataContext } from '../providers';

function stringifyDeathsPerRound(deathsPerRound: {
  number: number;
  CT: number;
  Terrorist: number;
}) {
  return `CT: ${deathsPerRound.CT} | T: ${deathsPerRound.Terrorist}`;
}

function stringifyTeamWinner(roundWonCondition: {
  number: number;
  winnerCSGOTeam: TeamKinds;
  teamPlayingCT: string;
  teamPlayingTerrorists: string;
  winCondition: VictoryKinds;
  score: Score;
}): string {
  if (roundWonCondition.winnerCSGOTeam === TeamKinds.CT) {
    return `${roundWonCondition.teamPlayingCT} (CT)`;
  } else {
    return `${roundWonCondition.teamPlayingTerrorists} (Terrorist)`;
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

const columns: Column[] = [
  { id: 1, label: 'n°', minWidth: 10 },
  { id: 2, label: 'CT', minWidth: 90 },
  { id: 3, label: 'Terrorist', minWidth: 90 },
  { id: 4, label: 'Deaths', minWidth: 70 },
  { id: 5, label: 'Winner', minWidth: 100 },
  { id: 6, label: 'Win condition', minWidth: 90 },
  { id: 7, label: 'Score', minWidth: 80 },
  { id: 8, label: 'CT money spent', minWidth: 80 },
  { id: 9, label: 'Terrorist money spent', minWidth: 80 },
];

export default function Rounds() {
  const gameData = useContext(GameDataContext);

  return (
    <BoxCenter>
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
        <Box paddingBottom={2}></Box>

        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {gameData.roundWonConditions.rounds.map((roundWonCondition) => {
                const moneySpent = gameData.moneySpentPerRound.rounds.find(
                  (r) => r.number === roundWonCondition.number
                )!;

                const deathsPerRound = stringifyDeathsPerRound(
                  gameData.deathsPerRound.rounds.find(
                    (r) => r.number === roundWonCondition.number
                  )!
                );
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
                      {deathsPerRound}
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
      </>
    </BoxCenter>
  );
}
