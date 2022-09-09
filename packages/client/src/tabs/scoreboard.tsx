import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import { useContext } from 'react';
import { GameDataContext, TeamsContext } from '../providers';
import { PlayerStats } from 'shared/models/stats/player_stats';
import { KDAStats } from 'shared/models/stats/kda_stats';
import { Box } from '@mui/system';
import Rounds from '../components/rounds';
import ParagraphTitle from '../components/paragraph_title';

function sumKDA(players: PlayerStats[]): KDAStats {
  return players
    .map((p) => p.kda)
    .reduce(
      (acc, kda) => {
        return {
          assists: acc.assists + kda.assists,
          deaths: acc.deaths + kda.deaths,
          kills: acc.kills + kda.kills,
        };
      },
      { assists: 0, kills: 0, deaths: 0 }
    );
}

function stringifyKDA(kda: KDAStats) {
  return `${kda.kills} / ${kda.deaths} / ${kda.assists}`;
}

export default function Scoreboard() {
  const teams = useContext(TeamsContext);
  const { firstTeam, secondTeam } = teams.state;
  const gameData = useContext(GameDataContext);
  const firstTeamPlayers = gameData.players.filter((p) => p.team === firstTeam);
  const secondTeamPlayers = gameData.players.filter(
    (p) => p.team === secondTeam
  );

  const firstTeamKDA = sumKDA(firstTeamPlayers);
  const secondTeamKDA = sumKDA(secondTeamPlayers);

  const firstTeamMoney = gameData.gameResults.teamWinnerMoney;
  const secondTeamMoney = gameData.gameResults.teamLoserMoney;

  const MVP = gameData.mvp.name;

  return (
    <Box alignSelf={'center'} paddingLeft={'20%'} paddingRight={'20%'}>
      <>
        <ParagraphTitle name="Scoreboard" />
        <TableContainer component={Paper}>
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
        </TableContainer>
        <Box paddingBottom={4}></Box>
        <Typography component={'div'} align={'left'}>
          <>
            <Typography component={'span'} fontWeight={'bold'}>
              {gameData.playerWithTheMostKills.player}
            </Typography>{' '}
            scored the most kills: {gameData.playerWithTheMostKills.kills}
          </>
        </Typography>
        <Typography component={'div'} align={'left'}>
          <>
            <Typography component={'span'} fontWeight={'bold'}>
              {gameData.playerWithTheMostKills.player}
            </Typography>{' '}
            scored the most money: {gameData.playerWithTheMostMoney.money}
          </>
        </Typography>
        <Rounds />
      </>
    </Box>
  );
}
