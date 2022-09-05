import express, { Application, Request, Response } from 'express';
import { GameData } from './core/game_data';
import { LogReader } from './core/log_reader';

const app: Application = express();
const port = 4000;

const logReader = new LogReader();
let gameData: GameData;

app.get('/statistics', async (_: Request, res: Response) => {
  const playerWithTheMostKills = gameData.getPlayerWithTheMostKills();
  const playerWithTheMostMoney = gameData.getPlayerWithTheMostMoney();
  const hitCounter = gameData.getHitCounter();
  const mvp = gameData.getMVP();
  const roundWonConditions = gameData.getRoundWonConditions();
  const mostArmamentBought = gameData.getListOfArmamentBought();
  const playerStats = await gameData.getPlayersStats();
  console.log(
    playerWithTheMostKills,
    playerWithTheMostMoney,
    hitCounter,
    mvp,
    roundWonConditions,
    mostArmamentBought,
    playerStats
  );
  res.send(gameData);
});

app.get('/read_data', async (_: Request, res: Response) => {
  gameData = await logReader.read();
  res.send('Data read');
});

app.listen(port, async function () {
  gameData = await logReader.read();
  console.log(`App is listening on port ${port}!`);
});
