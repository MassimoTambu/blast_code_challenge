import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import { useContext } from 'react';
import { GameDataContext } from '../providers';

export default function BlastAppBar() {
  const gameData = useContext(GameDataContext);
  const teamWinner = gameData.gameResults.teamWinner;
  const lastRound = _(gameData.roundWonConditions.rounds).last();

  if (_.isUndefined(lastRound)) {
    throw new Error('No round found in this game');
  }

  let firstPoints = 0;
  let secondPoints = 0;
  if (teamWinner === lastRound.teamPlayingCT) {
    firstPoints = lastRound.score.CT;
    secondPoints = lastRound.score.Terrorist;
  } else {
    firstPoints = lastRound.score.Terrorist;
    secondPoints = lastRound.score.CT;
  }

  const score = firstPoints + ' - ' + secondPoints;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              paddingTop={2}
            >
              Team {teamWinner} won {score}
            </Typography>
            <Typography variant="subtitle2" component="div" paddingBottom={1}>
              <>
                {gameData.gameResults.map} -{' '}
                {gameData.gameResults.duration.minutes} minutes -{' '}
                {gameData.gameResults.startDate}
              </>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
