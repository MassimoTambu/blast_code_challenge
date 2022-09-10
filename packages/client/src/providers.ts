import React from 'react';
import { GameDataResponse } from 'shared/models/game_data_response';
import { Teams } from './models/teams';

export const GameDataContext = React.createContext<GameDataResponse | null>(
  null
) as React.Context<GameDataResponse>;

export const TeamReducer = (_: Teams, action: Teams) => {
  return {
    ...action,
  };
};

export const TeamInitialState: Teams = {
  firstTeam: '',
  secondTeam: '',
};

export const TeamsContext = React.createContext<{
  state: Teams;
  dispatch: React.Dispatch<Teams>;
}>({ state: TeamInitialState, dispatch: () => null });
