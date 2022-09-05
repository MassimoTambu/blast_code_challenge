export interface MoneySpentPerRoundStats {
  rounds: {
    number: number;
    CTMoney: number;
    TerroristMoney: number;
  }[];
}
