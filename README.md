# Blast Code Challenge

## Code challenge description

YOUR CHALLENGE:
ANALYSE THE MATCH
At this location, we have a log of match data from a real competitive CS:GO match by professional teams. If you are not familiar with CS:GO already, that’s OK. Prior domain knowledge is not required, but some quick research might be beneficial.
We want you to parse this file, and visualize some match statistics. It is up to you what you want to show and how.

Examples of interesting stats could be:

Round average length
Number of kills per player
Scoreboard (over time)
etc.
The match data can be found here

It is up to you how you want to solve this, and which programming language(s) / technologies you want to use.

The challenge should roughly take 5-6 hours to do, but it is up to you how long you want to spend.

If you have any questions, feel free to write to codechallenge@blast.tv

Hints
There might be multiple “Match_Start” events, but only the last one starts the match for real. “[FACEIT]” are messages by an admin Example of player names: ZywOo, s1mple, Boombl4

## Info

### Client

Typescript with Vite & React.js

Packages:

- typescript
- vite
- @mui/material
- lodash
- react
- react-dom
- react-script
- eslint
- prettier

### Server

Typescript with Node.js and Express.js

Packages:

- typescript
- @types/node
- express
- lodash
- mocha & chai for tests
- nodemon: watch for changes and automatically restart when a file is changed
- ts-node: runs typescript code without having to wait for it be compiled
- rimraf: rm -rf compatible with every platform
- eslint
- prettier

## Setup

Run `npm i` and then `npm run start` from the root directory

## How it works

To classify every useful information read from the log of the game, I create a structure divided into Event and Creator.
The **Event** is an abstract class which identify a log line. Every subclass which implements Event must define its fields into a constructor and add (if any) its own specialized fields. As instance, **DroppedEvent** class implements Event field (and PlayerTeamEvent too) and adds its field _armament_. This is a kind of rapresentation in data class of the gathered data.
The **Creator** abstract class, on the other hand, defines how to create the Event. For each Event we have a specialized creator; as instance, for DroppedEvent we have the **DroppedCreator** class which extends Creator and defines which regex to use, how to extract the values from the log line (extractValues method) and how to create the event (createEvent method). If it fails and returns _false_, it means the log line passed to this creator is not elegible to get that specific event.
<br>
During the server initialization, the log file will be read and every line will be scanned by every creator defined. The unanalyzed lines will be written in a separate log file under _logs_ folder.
