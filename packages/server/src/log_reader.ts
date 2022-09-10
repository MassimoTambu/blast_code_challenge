import * as fs from 'fs';
import * as readline from 'readline';
import path from 'path';
import { CREATORS } from './creators';
import { Event } from './event';
import { GameData } from './game_data';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class LogReader {
  private readonly unanalyzedLogsFileName = 'unanalyzed_logs.txt';
  private readonly logsFileName = 'NAVIvsVitaGF-Nuke.txt';

  private readonly logFolderPath = path.join(__dirname, '..', 'logs');
  private readonly logsPath = path.join(this.logFolderPath, this.logsFileName);
  private readonly unanalyzedLogsPath = path.join(
    this.logFolderPath,
    this.unanalyzedLogsFileName
  );

  public async read(): Promise<GameData> {
    const logsReadableStream = fs.createReadStream(this.logsPath, 'utf8');
    // Reads line per line
    const logsReadLine = readline.createInterface({
      input: logsReadableStream,
      crlfDelay: Infinity,
    });

    // Used for writing discarded lines due to the conversion failed
    const unanalyzedLogsWritableStream = fs.createWriteStream(
      this.unanalyzedLogsPath,
      {
        flags: 'w',
        encoding: 'utf8',
      }
    );

    const events = [];
    for await (const line of logsReadLine) {
      let newEvent: Event | false | undefined;

      for (const creator of CREATORS) {
        newEvent = creator.createEvent(line);

        if (newEvent) break;
      }

      if (!newEvent) {
        unanalyzedLogsWritableStream.write(line.toString() + '\n');
        continue;
      }

      events.push(newEvent);
    }
    logsReadLine.on('close', () => unanalyzedLogsWritableStream.close());

    return new GameData(events);
  }
}
