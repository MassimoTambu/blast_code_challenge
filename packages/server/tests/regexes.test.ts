import { expect } from 'chai';
import { Regexes } from '../src/regexes';
import { TestStrings } from './test_strings';

describe('Regex tests', () => {
  it('checks if Event regex works as expected', () => {
    TestStrings.Event.map((s) => expect(s).to.match(Regexes.Event));
    TestStrings.FailingEvent.map((s) => expect(s).to.not.match(Regexes.Event));
  });

  it('checks if PlayerTeam regex works as expected', () => {
    TestStrings.PlayerTeam.map((s) => expect(s).to.match(Regexes.PlayerTeam));
  });

  it('checks if PlayerSwitchedTeam regex works as expected', () => {
    TestStrings.PlayerSwitchedTeam.map((s) =>
      expect(s).to.match(Regexes.PlayerSwitchedTeam)
    );
  });

  it('checks if MoneyChange regex works as expected', () => {
    TestStrings.MoneyChange.map((s) => expect(s).to.match(Regexes.MoneyChange));
    TestStrings.FailingMoneyChange.map((s) =>
      expect(s).to.not.match(Regexes.MoneyChange)
    );
  });

  it('checks if PickedUp regex works as expected', () => {
    TestStrings.PickedUp.map((s) => expect(s).to.match(Regexes.PickedUp));
  });

  it('checks if Dropped regex works as expected', () => {
    TestStrings.Dropped.map((s) => expect(s).to.match(Regexes.Dropped));
  });

  it('checks if LeftBuyZone regex works as expected', () => {
    TestStrings.LeftBuyZone.map((s) => expect(s).to.match(Regexes.LeftBuyZone));
    expect(
      TestStrings.LeftBuyZone[TestStrings.LeftBuyZone.length - 1]
    ).to.be.string(' ');
  });

  it('checks if Attacked regex works as expected', () => {
    TestStrings.Attacked.map((s) => expect(s).to.match(Regexes.Attacked));
  });

  it('checks if Killed regex works as expected', () => {
    TestStrings.Killed.map((s) => expect(s).to.match(Regexes.Killed));
  });

  it('checks if AssistedKilling regex works as expected', () => {
    TestStrings.AssistedKilling.map((s) =>
      expect(s).to.match(Regexes.AssistedKilling)
    );
  });

  it('checks if Threw regex works as expected', () => {
    TestStrings.Threw.map((s) => expect(s).to.match(Regexes.Threw));
  });

  it('checks if Blinded regex works as expected', () => {
    TestStrings.Blinded.map((s) => expect(s).to.match(Regexes.Blinded));
  });

  it('checks if PlayerTriggered regex works as expected', () => {
    TestStrings.PlayerTriggered.map((s) =>
      expect(s).to.match(Regexes.PlayerTriggered)
    );
  });

  it('checks if Say regex works as expected', () => {
    TestStrings.Say.map((s) => expect(s).to.match(Regexes.Say));
  });

  it('checks if MatchStart regex works as expected', () => {
    TestStrings.MatchStart.map((s) => expect(s).to.match(Regexes.MatchStart));

    TestStrings.FailingMatchStart.map((s) =>
      expect(s).to.not.match(Regexes.MatchStart)
    );
  });

  it('checks if RestartRound regex works as expected', () => {
    TestStrings.RestartRound.map((s) =>
      expect(s).to.match(Regexes.RestartRound)
    );
  });

  it('checks if RoundStart regex works as expected', () => {
    TestStrings.RoundStart.map((s) => expect(s).to.match(Regexes.RoundStart));
  });

  it('checks if RoundEnd regex works as expected', () => {
    TestStrings.RoundEnd.map((s) => expect(s).to.match(Regexes.RoundEnd));
  });

  it('checks if GameOver regex works as expected', () => {
    TestStrings.GameOver.map((s) => expect(s).to.match(Regexes.GameOver));
  });

  it('checks if FinalAccolade regex works as expected', () => {
    TestStrings.FinalAccolade.map((s) =>
      expect(s).to.match(Regexes.FinalAccolade)
    );
  });

  it('checks if Team regex works as expected', () => {
    TestStrings.Team.map((s) => expect(s).to.match(Regexes.Team));
  });

  it('checks if RoundVictory regex works as expected', () => {
    TestStrings.RoundVictory.map((s) =>
      expect(s).to.match(Regexes.RoundVictory)
    );
  });

  it('checks if GameVictory regex works as expected', () => {
    TestStrings.GameVictory.map((s) => expect(s).to.match(Regexes.GameVictory));
  });
});
