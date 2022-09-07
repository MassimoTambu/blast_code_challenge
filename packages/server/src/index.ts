import express, { Application, Request, Response } from 'express';
import { GameData } from './game_data';
import { LogReader } from './log_reader';
import { GameDataResponse } from 'shared/models/game_data_response';

const app: Application = express();
const port = 4000;

const logReader = new LogReader();
let gameData: GameData;

app.use(function (_, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  next();
});

app.get('/statistics', async (_: Request, res: Response<GameDataResponse>) => {
  const gameDataResponse: GameDataResponse = {
    gameResults: gameData.getGameResults(),
    playerWithTheMostKills: gameData.getPlayerWithTheMostKills(),
    playerWithTheMostMoney: gameData.getPlayerWithTheMostMoney(),
    armamentBought: gameData.getListOfArmamentBought(),
    hitCounter: gameData.getHitCounter(),
    mvp: gameData.getMVP(),
    roundWonConditions: gameData.getRoundWonConditions(),
    players: await gameData.getPlayersStats(),
    roundsResults: gameData.getGeneralRoundStats(),
    moneySpentPerRound: gameData.getMoneySpentPerRound(),
    throwableArmamentUsedPerRound: gameData.getThrowableArmamentsUsedPerRound(),
  };

  res.send(gameDataResponse);
});

app.get('/read_data', async (_: Request, res: Response) => {
  gameData = await logReader.read();
  res.send('Data read');
});

app.listen(port, async function () {
  gameData = await logReader.read();
  console.log(`App is listening on port ${port}!`);
});
