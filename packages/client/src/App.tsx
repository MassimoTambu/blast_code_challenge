import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useReducer, useState } from 'react';
import './App.css';
import BlastAppBar from './components/app_bar';
import theme from './theme';
import { GameDataResponse } from 'shared/models/game_data_response';

import _ from 'lodash';
import {
  GameDataContext,
  TeamInitialState,
  TeamReducer,
  TeamsContext,
} from './providers';
import BasicTabs from './components/tab_panel';

function App() {
  const [gameData, setGameData] = useState<GameDataResponse | null>(null);
  const [teamState, teamDispatch] = useReducer(TeamReducer, TeamInitialState);

  useEffect(() => {
    async function getStatistics() {
      const res = await fetch('http://127.0.0.1:4000/statistics', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data = (await res.json()) as GameDataResponse;
      console.log(
        'Watch out for React.StrictMode: it will render components twice'
      );
      console.log(data);

      setGameData(data);

      const lastRound = _(data.roundWonConditions.rounds).last();

      if (_.isUndefined(lastRound)) {
        throw new Error('No round found in this game');
      }

      let firstTeam = '';
      let secondTeam = '';
      if (data.gameResults.teamWinner === lastRound.teamPlayingCT) {
        firstTeam = lastRound.teamPlayingCT;
        secondTeam = lastRound.teamPlayingTerrorists;
      } else {
        firstTeam = lastRound.teamPlayingTerrorists;
        secondTeam = lastRound.teamPlayingCT;
      }

      teamDispatch({ firstTeam, secondTeam });
    }

    getStatistics();
  }, []);

  return (
    <div className="App">
      {gameData && (
        <ThemeProvider theme={theme}>
          <GameDataContext.Provider value={gameData}>
            <TeamsContext.Provider
              value={{
                state: teamState,
                dispatch: teamDispatch,
              }}
            >
              <BlastAppBar />
              <BasicTabs />
            </TeamsContext.Provider>
          </GameDataContext.Provider>
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
