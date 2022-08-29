//TODO update all

// export type EventKindType = { group: 'PlayerAction' | 'MatchStatus' | 'Admin', value: EventKindsEnum };

export enum EventGroups {
  PlayerAction,
  MatchStatus,
}

// export const enum EventKindsEnum {
//   // Player Action Events
//   ConnectedAddress,
//   EnteredGame,
//   SwitchedTeam,
//   PickedUp,
//   Dropped,
//   LeftBuyzone,
//   Purchased,
//   MoneyChangePump,
//   MoneyChangeDump,
//   Attacked,
//   Killed,
//   Assisted,
//   Threw,
//   Blinded,
//   TriggeredGotTheBomb,
//   TriggeredBombBeginPlant,
//   TriggeredPlantedTheBomb,
//   TriggeredBeginBombDefuseWithKit,
//   TriggeredDefusedTheBomb,
//   Say,
//   SayTeam,
//   // Match Status Events
//   MatchStart,
//   RoundStart,
//   RoundEnd,
//   GameOver,
//   Accolade,
//   MatchStatusScore,
//   MatchStatusTeamPlaying,
//   TeamTriggered,
//   // Admin Events
//   NoTie,
//   TeamWon,
//   Score,
// }

// export class EventKinds {
//   static readonly ConnectedAddress: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.ConnectedAddress };
//   static readonly EnteredGame: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.EnteredGame };
//   static readonly SwitchedTeam: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.SwitchedTeam };
//   static readonly PickedUp: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.PickedUp };
//   static readonly Dropped: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Dropped };
//   static readonly LeftBuyzone: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.LeftBuyzone };
//   static readonly Purchased: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Purchased };
//   static readonly MoneyChangePump: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.MoneyChangePump };
//   static readonly MoneyChangeDump: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.MoneyChangeDump };
//   static readonly Attacked: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Attacked };
//   static readonly Killed: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Killed };
//   static readonly Assisted: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Assisted };
//   static readonly Threw: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Threw };
//   static readonly Blinded: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Blinded };
//   static readonly TriggeredGotTheBomb: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.TriggeredGotTheBomb };
//   static readonly TriggeredBombBeginPlant: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.TriggeredBombBeginPlant };
//   static readonly TriggeredPlantedTheBomb: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.TriggeredPlantedTheBomb };
//   static readonly TriggeredBeginBombDefuseWithKit: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.TriggeredBeginBombDefuseWithKit };
//   static readonly TriggeredDefusedTheBomb: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.TriggeredDefusedTheBomb };
//   static readonly Say: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Say };
//   static readonly SayTeam: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.SayTeam };
//   static readonly MatchStart: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.MatchStart };
//   static readonly RoundStart: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.RoundStart };
//   static readonly RoundEnd: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.RoundEnd };
//   static readonly GameOver: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.GameOver };
//   static readonly Accolade: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.Accolade };
//   static readonly MatchStatusScore: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.MatchStatusScore };
//   static readonly MatchStatusTeamPlaying: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.MatchStatusTeamPlaying };
//   static readonly TeamTriggered: EventKindType = { group: 'PlayerAction', value: EventKindsEnum.TeamTriggered };
//   static readonly NoTie: EventKindType = { group: 'Admin', value: EventKindsEnum.NoTie, };
//   static readonly TeamWon: EventKindType = { group: 'Admin', value: EventKindsEnum.TeamWon, };
//   static readonly Score: EventKindType = { group: 'Admin', value: EventKindsEnum.Score, };
// }
