/**
 * Contains all the regexes used for extracting data
 */
export class Regexes {
  /** groups: month, day, year, hours, minutes, seconds */
  static readonly Event =
    /^(\d{2})\/(\d{2})\/(\d{4}) - (\d{2}):(\d{2}):(\d{2})/;
  /** groups: name, unknown number, steam id, team */
  static readonly PlayerTeam =
    /^\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}: "(.*?)<(\d*)><(.*?)><(.*?)>"/;
  /** groups: from, to */
  static readonly PlayerSwitchedTeam =
    /^\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}: "(.*?)<\d*><.*?>" switched from team <(.*?)> to <(.*?)>$/;
  /** groups: armament */
  static readonly PickedUp = /picked up "(.*)"/;
  /** groups: armament */
  static readonly Dropped = /dropped "(.*)"/;
  /** groups: list of armaments */
  static readonly LeftBuyZone =
    /left buyzone with \[ (.*) \]$|left buyzone with \[ \]$/;
  /** groups: money start, symbol (+ or -), money change, total, OPTIONAL armament */
  static readonly MoneyChange =
    /money change (\d*)(\+)(\d*) = \$(\d*) \(tracked\)$|money change (\d*)(-)(\d*) = \$(\d*).*\(purchase: (.*)\)$/;
  /**
   * groups:
   * - attacked player name
   * - unknown number
   * - steam id
   * - team
   * - attacked with armament
   * - health damage qty
   * - armor damage qty
   * - remaining health
   * - remaining armor
   * - hit group
   */
  static readonly Attacked =
    /attacked "(.*)<(\d*)><(.*)><(.*)>".*with "(.*)" \(damage "(\d*)"\) \(damage_armor "(\d*)"\) \(health "(\d*)"\) \(armor "(\d*)"\) \(hitgroup "(.*)"\)/;
  /**
   * groups:
   * - killed player name
   * - unknown number
   * - steam id
   * - team
   * - killed with armament
   * - OPTIONAL kill kind
   */
  static readonly Killed =
    /killed "(.*)<(\d*)><(.*)><(.*)>".*with "(.*)" \((.*)\)|killed "(.*)<(\d*)><(.*)><(.*)>".*with "(.*)"/;
  /**
   * groups:
   * - assist kill on player name
   * - unknown number
   * - steam id
   * - team
   */
  static readonly AssistedKilling =
    /assisted killing "(.*)<(\d*)><(.*)><(.*)>"/;
  /**
   * groups:
   * - armament
   * - OPTIONAL entindex
   */
  static readonly Threw = /threw (.*) \[.*\] .*entindex (\d*)\)$|threw (.*) \[/;
  /**
   * groups:
   * - seconds
   * - armament throwed by player name
   * - unknown number
   * - steam id
   * - team
   * - armament (should always be flashbang)
   * - entindex
   */
  static readonly Blinded =
    /blinded for (\d*.\d*) by "(.*)<(\d*)><(.*)><(.*)>" from (.*) entindex (\d*).$/;
  /** groups: trigger, OPTIONAL bombsite letter */
  static readonly PlayerTriggered =
    /.*<\d*><.*><.*>" triggered "(.*)" at bombsite (\w)|".*<\d*><.*><.*>" triggered "(.*)"/;
  /** groups: say kind, message */
  static readonly Say = /(say) "(.*)"|(say_team) "(.*)"/;

  /** groups: map */
  static readonly MatchStart = /World triggered "Match_Start" on "(.*)"$/;
  /** no groups */
  static readonly RestartRound = /World triggered "Restart_Round_\(.*?\)"/;
  /** no groups */
  static readonly RoundStart = /World triggered "Round_Start"$/;
  /** no groups */
  static readonly RoundEnd = /World triggered "Round_End"$/;
  /** groups: duration in minutes */
  static readonly GameOver = /Game Over:.* score \d*:\d* after (\d*) min$/;
  /** groups: accolade kind, player name, value, position, score */
  static readonly FinalAccolade =
    // Rule disabled due to 'x09' character
    // eslint-disable-next-line no-control-regex
    /ACCOLADE, FINAL: \{(.*?)\},	(.*?)<\d*>,	VALUE: (\d*.\d*),	POS: (\d*),	SCORE: (\d*.\d*)$/;
  /** groups: CS GO team name, team name */
  static readonly Team = /MatchStatus: Team playing "(.*?)": (.*?)$/;
  /**
   * groups:
   * - CS GO team name
   * - victory kind
   * - CS GO team name
   * - points
   * - CS GO team name
   * - points
   */
  static readonly RoundVictory =
    /Team "(.*?)" triggered "(.*?)" \((\w*) "(\d*)"\) \((\w*) "(\d*)"\)/;
  /** groups: team name */
  static readonly GameVictory = /\[FACEIT\^\] Team (.*) won.$/;
}
