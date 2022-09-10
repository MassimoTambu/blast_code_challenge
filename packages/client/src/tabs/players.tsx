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
import _ from 'lodash';
import { PropsWithChildren, ReactNode, useContext } from 'react';
import { HitCounterStatsWithFatalHeadshots } from 'shared/models/stats/hit_counter_stats';
import BoxCenter from '../components/box_center';
import ParagraphTitle from '../components/paragraph_title';
import { Column } from '../models/column';
import { GameDataContext } from '../providers';
import { approxDecimals, stringifyKDA } from '../utils';

function TableRowSubCategory(props: PropsWithChildren<{ name: string }>) {
  return (
    <TableRow
      key={props.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Typography component={'span'} fontWeight={'500'} fontSize={14}>
          {props.name}
        </Typography>
      </TableCell>
      {props.children}
    </TableRow>
  );
}

function TableRowCategory(props: { name: string; length: number }) {
  const emptyCells = [];
  for (let i = 0; i < props.length - 1; i++) {
    emptyCells.push(<TableCell key={i} />);
  }

  return (
    <TableRow
      key={props.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Typography component={'span'} fontWeight={'500'} fontSize={15}>
          {props.name}
        </Typography>
      </TableCell>
      {emptyCells}
    </TableRow>
  );
}

function convertHitCounterToNode(
  hitCounter: HitCounterStatsWithFatalHeadshots
): ReactNode {
  return (
    <>
      <Typography component={'div'} fontSize="0.875rem">
        Head: {hitCounter.hitCounterStats.head ?? 0} | Fatal:{' '}
        {hitCounter.fatalHeadshots ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Neck: {hitCounter.hitCounterStats.neck ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Chest: {hitCounter.hitCounterStats.chest ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Stomach: {hitCounter.hitCounterStats.stomach ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Left arm: {hitCounter.hitCounterStats['left arm'] ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Right arm: {hitCounter.hitCounterStats['right arm'] ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Left leg: {hitCounter.hitCounterStats['left leg'] ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Right leg: {hitCounter.hitCounterStats['right leg'] ?? 0}
      </Typography>
      <Typography component={'div'} fontSize="0.875rem">
        Generic (from grenades): {hitCounter.hitCounterStats.generic ?? 0}
      </Typography>
    </>
  );
}

function prettifyArmamentName(armament: string): string {
  return armament.replace('weapon_', '').replace('item_', '').replace('_', ' ');
}

export default function Players() {
  const gameData = useContext(GameDataContext);

  const playersStats = _(gameData.players)
    .orderBy((p) => p.team === gameData.gameResults.teamWinner, 'desc')
    .value();

  const playerWinners = playersStats.filter(
    (p) => p.team === gameData.gameResults.teamWinner
  );
  const playerWinnersColumns = playerWinners.map((p, i) => {
    return { id: `${p.team}-${i + 1}`, label: p.name, minWidth: 150 };
  });

  const playersLosers = playersStats.filter(
    (p) => p.team !== gameData.gameResults.teamWinner
  );
  const playersLosersColumns = playersLosers.map((p, i) => {
    return { id: `${p.team}-${i + 1}`, label: p.name, minWidth: 150 };
  });

  const teamsColumns: Column[] = [
    { id: 0, label: '', minWidth: 80 },
    ...playerWinnersColumns.map((p) => {
      if (p.id.endsWith('1')) {
        const team = p.id.split('-')[0];
        return { ...p, label: team };
      }

      return { ...p, label: '' };
    }),
    ...playersLosersColumns.map((p) => {
      if (p.id.endsWith('1')) {
        const team = p.id.split('-')[0];
        return { ...p, label: team };
      }

      return { ...p, label: '' };
    }),
  ];

  const playersColumns: Column[] = [
    { id: 0, label: '', minWidth: 110 },
    ...playerWinnersColumns,
    ...playersLosersColumns,
  ];

  return (
    <BoxCenter>
      <>
        <ParagraphTitle name="Players Stats" />

        <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
          <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {teamsColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {playersColumns.map((column) => (
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
              <TableRowCategory
                name={'Combat'}
                length={playersColumns.length}
              />
              <TableRowSubCategory name={'KDA'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>{stringifyKDA(p.kda)}</TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Kill/Headshot %'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    <Typography component={'div'} fontSize="0.875rem">
                      Headshot kills: {p.killHeadshotPercentage.headshotKills}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      Total kills: {p.killHeadshotPercentage.totalKills}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      Percentage:{' '}
                      {approxDecimals(p.killHeadshotPercentage.percentage)}%
                    </Typography>
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Hit/Headshot %'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    <Typography component={'div'} fontSize="0.875rem">
                      Headshot hits: {p.hitHeadshotPercentage.headshotHits}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      Total hits: {p.hitHeadshotPercentage.totalHits}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      Percentage:{' '}
                      {approxDecimals(p.hitHeadshotPercentage.percentage)}%
                    </Typography>
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowCategory
                name={'Hit Counter'}
                length={playersColumns.length}
              />
              <TableRowSubCategory name={'Dealt'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    {convertHitCounterToNode(p.hitCounter.dealt)}
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Sustained'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    {convertHitCounterToNode(p.hitCounter.sustained)}
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowCategory
                name={'Armaments'}
                length={playersColumns.length}
              />
              <TableRowSubCategory name={'Molotov damage dealt'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    {approxDecimals(p.molotovDamage.damageDealt) ?? 0}
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Molotov damage sustained'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    {approxDecimals(p.molotovDamage.damageSustained) ?? 0}
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Blinded dealt (seconds)'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    {approxDecimals(p.blinded.dealtInSeconds) ?? 0}
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Blinded sustained (seconds)'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    {approxDecimals(p.blinded.sustainedInSeconds) ?? 0}
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Armaments bought'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    {p.armamentsBought.map((a, i) => (
                      <Typography key={i} component={'div'} fontSize="0.875rem">
                        {prettifyArmamentName(a.armament)}: {a.count}
                      </Typography>
                    ))}
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowCategory name={'Bombs'} length={playersColumns.length} />
              <TableRowSubCategory name={'Planted'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    <Typography component={'div'} fontSize="0.875rem">
                      A: {p.bombs.planted.A ?? 0}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      B: {p.bombs.planted.B ?? 0}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      Total: {p.bombs.planted.total ?? 0}
                    </Typography>
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Defused'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    <Typography component={'div'} fontSize="0.875rem">
                      A: {p.bombs.defused.A ?? 0}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      B: {p.bombs.defused.B ?? 0}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      Total: {p.bombs.defused.total ?? 0}
                    </Typography>
                  </TableCell>
                ))}
              </TableRowSubCategory>
              <TableRowSubCategory name={'Exploded'}>
                {playersStats.map((p, i) => (
                  <TableCell key={i + p.name}>
                    <Typography component={'div'} fontSize="0.875rem">
                      A: {p.bombs.exploded.A ?? 0}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      B: {p.bombs.exploded.B ?? 0}
                    </Typography>
                    <Typography component={'div'} fontSize="0.875rem">
                      Total: {p.bombs.exploded.total ?? 0}
                    </Typography>
                  </TableCell>
                ))}
              </TableRowSubCategory>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </BoxCenter>
  );
}
