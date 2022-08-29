export enum VictoryKinds {
  BombDefused = 'SFUI_Notice_Bomb_Defused',
  BombExploded = 'SFUI_Notice_Target_Bombed',
  CTACE = 'SFUI_Notice_Terrorists_Win',
  TerroristACE = 'SFUI_Notice_CTs_Win',
}

export enum TeamKinds {
  CT = 'CT',
  Terrorist = 'TERRORIST',
  Unassigned = 'Unassigned',
  Spectator = 'Spectator',
}

export enum PlayerTriggerKinds {
  Got_The_Bomb = 'Got_The_Bomb',
  Bomb_Begin_Plant = 'Bomb_Begin_Plant',
  Planted_The_Bomb = 'Planted_The_Bomb',
  Begin_Bomb_Defuse_With_Kit = 'Begin_Bomb_Defuse_With_Kit',
  Defused_The_Bomb = 'Defused_The_Bomb',
  Dropped_The_Bomb = 'Dropped_The_Bomb',
}

export enum MoneyChangeKinds {
  Increment = 'Increment',
  Decrement = 'Decrement',
}

export enum HitGroupKinds {
  Generic = 'generic',
  Head = 'head',
  Neck = 'neck',
  Chest = 'chest',
  Stomach = 'stomach',
  LeftArm = 'left arm',
  RightArm = 'right arm',
  LeftLeg = 'left leg',
  RightLeg = 'right leg',
}

export enum KilledKinds {
  Headshot = 'headshot',
  HeashotPenetrated = 'headshot penetrated',
  Penetraded = 'penetrated',
  ThroughSmoke = 'throughsmoke',
}

export enum ThrowableArmamentKinds {
  Molotov = 'molotov',
  SmokeGrenade = 'smokegrenade',
  HeGrenade = 'hegrenade',
  Flashbang = 'flashbang',
}
