import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import './App.css';
import BlastAppBar from './components/app_bar';
import theme from './theme';
import { GameDataResponse } from 'shared/models/game_data_response';

function App() {
  const [gameData, setGameData] = useState<GameDataResponse | null>(null);

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
    }

    getStatistics();
  }, []);

  return (
    <div className="App">
      {gameData && (
        <ThemeProvider theme={theme}>
          <BlastAppBar />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
