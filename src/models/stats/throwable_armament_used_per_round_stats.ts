export interface ThrowableArmamentUsedPerRoundStats {
  rounds: {
    number: number;
    total: number;
    CT: ThrowableArmamentUsedStats;
    Terrorists: ThrowableArmamentUsedStats;
  }[];
}

export interface ThrowableArmamentUsedStats {
  smokes: number;
  flashbangs: number;
  molotov: number;
}
