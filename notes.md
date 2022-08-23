# NOTES

Some notes about how to structure the models and a list of analysis I want to do

## Models

### Event

Every log line starting with date and time we'll be classified as "Event"


### Player

Starts with `"name<id><steamID><team>"` Action or `"name<id><BOT><team>"` Action


### Action

Starts with Player model

| Type                                    | Comment         | Regex                 |
|-----------------------------------------|-----------------|-----------------------|
| connected, address ""                   |                 |                       |
| entered the game                        |                 |                       |
| switched from team <Unassigned> to <CT> |                 |                       |
| picked up "knife"                       |                 |                       |
| dropped "knife"                         |                 |                       |
| left buyzone with [ ] <b>OR</b> left buyzone [ with weapon_knife_outdoor weapon_glock weapon_ak47 kevlar(100) helmet ]          |                 |                      |
| purchased "item_assaultsuit" | buy, it is better to use "money change" | `^.*purchased.*$` |
| money change 16000-1000 = $15000 (tracked) (purchase: item_assaultsuit) | buy: similar to "purchased" but with money log | `^.*money change \d*-\d*.*$` |
| money change 50+300 = $350 (tracked) | +300 for kills, +X for round won or lost in a specific way (like Team ACE) | `^.*money change \d*\+\d*.*$` |
| [1175 -911 -408] attacked "apEX<25><STEAM_1:1:14739219><CT>" [2504 -344 -353] with "ak47" (damage "33") (damage_armor "0") (health "67") (armor "0") (hitgroup "chest") |  | `^.*attacked.*$` |
| [1233 -1021 -417] killed other "func_breakable<416>" [1143 -797 -344] with "m4a1_silencer" | | `^.*killed.*$` |
| assisted killing "s1mple<30><STEAM_1:1:36968273><TERRORIST>" |  | `^.*assisted killing.*$` |
| 11/28/2021 - 21:03:55: "b1t<35><STEAM_1:0:143170874><TERRORIST>" threw flashbang [505 -1170 21] flashbang entindex 580) | for flashbangs there is a entindex (id) to match with "blinded for" action | `^.*threw.*$` |
| blinded for 0.32 by "Kyojin<34><STEAM_1:1:22851120><CT>" from flashbang entindex 457 | | `^.*blinded for.*$` |
| triggered "Got_The_Bomb" | | `^.*triggered "Got_The_Bomb".*$` |
| triggered "Bomb_Begin_Plant" at bombsite B | | `^.*triggered "Bomb_Begin_Plant".*$` |
| triggered "Planted_The_Bomb" at bombsite B | | `^.*triggered "Planted_The_Bomb".*$` |
| triggered "Begin_Bomb_Defuse_With_Kit" | | `^.*triggered "Begin_Bomb_Defuse_With_Kit".*$` |
| triggered "Defused_The_Bomb" | | `^.*triggered "Defused_The_Bomb".*$` |
| say "hf" | | `^.*say "*".*$` |
| say_team "les infiltres c1 vont commencé xD" | | `^.*say_team "*".*$` |


### World

Starts with `"World triggered"`

| Type                        | Comment         | Regex              |
|-----------------------------|-----------------|--------------------|
| "Match_Start" on "de_nuke"  | I need to take the last one to determine when the match starts | `^.*World triggered "Match_Start".*$` |
| "Round_Start"               | I need to take rounds in consideration when the last "Match_Start" event is written and discard them when there is no "Round_End" counterpart | `^.*World triggered "Round_Start".*$` |
| "Round_End"                 |                 | `^.*World triggered "Round_End".*$` |
| "Restart_Round_(1_second)"  | No useful       |                    |
| "Game_Commencing"           | No useful       |                    |
| "Game Over: competitive 1092904694 de_nuke score 6:16 after 50 min" | | `^.*Game Over:.*$` |
| ACCOLADE, FINAL: {burndamage},	misutaaa<5>,	VALUE: 52.000000,	POS: 2,	SCORE: 7.070709 |  | `^.*ACCOLADE, FINAL:.*$` |

### Match Status

| Type                        | Comment         | Regex                       |
|-----------------------------|-----------------|-----------------------------|
| MatchStatus: Score: 0:0 on map "de_nuke" RoundsPlayed: 0 | Logged when round starts and ends | `^.*MatchStatus: Score:.*$`  |
| MatchStatus: Team playing "CT": TeamVitality <b>OR</b> MatchStatus: Team playing "TERRORIST": NAVI GGBET | Logged when round starts and ends | `^.*MatchStatus: Team.*$`
| Team "CT" triggered "SFUI_Notice_CTs_Win" (CT "1") (T "0") | Used to check win condition: SFUI_Notice_CTs_Win->T ACE, SFUI_Notice_Bomb_Defused->Bomb Defused, SFUI_Notice_Target_Bombed->Bomb Exploded, SFUI_Notice_Terrorists_Win->CT ACE | `^.*Team "*.*" triggered .*$` |

### Admin

Starts with `"[FACEIT]"` or `[FACEIT^]`, watch out for strange chars

| Type                        | Comment         | Regex                    |
|-----------------------------|-----------------|--------------------------|
| Admin 370f72b0-09d7-428f-a405-e723de152880 swapped spectators side | No useful | `^.*\[FACEIT\].*$` |
| Admin 370f72b0-09d7-428f-a405-e723de152880 started the match | No useful | `^.*\[FACEIT\].*$` |
| Admin 370f72b0-09d7-428f-a405-e723de152880 unpaused the match | No useful | `^.*\[FACEIT\].*$` |
| Admin service cancelled the match with reason 1 | No useful | `^.*\[FACEIT\].*$` |
| Uploading GOTV demo         | No useful       | `^.*\[FACEIT\].*$`        |
| Blocked map de_nuke reserved command | No useful | `^.*\[FACEIT\].*$`     |
| LIVE!                       | No useful       | `^.*\[FACEIT\^\].*$`      |
| Please be aware that this match has overtime enabled, there is no tie.                          | Maybe put in general info | `^.*\[FACEIT\^\].*$` |
| A player disconnected, auto pausing. Call an admin to unpause. | No useful | `^.*\[FACEIT\^\].*$` |
| Please wait at least 30 sec before the next map. | No useful | `^.*\[FACEIT\^\].*$` |
| Team TeamVitality won.      |                 | `^.*\[FACEIT\^\].*Team .*$`      |
| An admin has cancelled the match. | No useful | `^.*\[FACEIT\^\].*$`      |
| NAVI GGBET [0 - 2] TeamVitality |             | `^.*\[FACEIT\^\].*\[*\]` |
| Blocked map de_nuke reserved command | No useful | `^.*\[FACEIT\].*$`     |
| Admin service sent logaddresses | No useful   | `^.*\[FACEIT\].*$`        |
| Admin 370f72b0-09d7-428f-a405-e723de152880 swapped teams | No useful | `^.*\[FACEIT\].*$` |



## Analysis

NOTES:
- every player must have their team color
- bots and spectators are excluded
- Match duration
- Player with more kills
- Player with more deaths (maybe)
- Player with more money
- Favourite gun
- Headshot
- Rateo kill/headshot
- Player deaths per round
- MVP
- Rounds won per bomb placement
- Rounds won per team ace
- Headshot percentage
- KDA
- Money spent per round
- Money earned per team
- Smokes used per round
- Flashbang used per round
- Blinded duration
- Bombs disarmed
- Bombs exploded
- Seconds with bomb per round
- Seconds with bomb total
