import * as fs from 'fs';
import * as readline from 'readline';
import path from 'path';
import { CREATORS } from './creators';
import { Event } from './event';

export class LogReader {
  private readonly unanalyzedLogsFileName = 'unanalyzedLogs.txt';
  private readonly logsFileName = 'NAVIvsVitaGF-Nuke.txt';

  private readonly logFolderPath = path.join(__dirname, '..', '..', 'logs');
  private readonly logsPath = path.join(this.logFolderPath, this.logsFileName);
  private readonly unanalyzedLogsPath = path.join(
    this.logFolderPath,
    this.unanalyzedLogsFileName
  );

  public read(): void {
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

    logsReadLine.on('line', (line) => {
      let newEvent: Event | false | undefined;

      for (const creator of CREATORS) {
        newEvent = creator.createEvent(line);

        if (newEvent) break;
      }

      if (!newEvent) {
        unanalyzedLogsWritableStream.write(line.toString() + '\n');
      }
    });

    logsReadLine.on('close', () => unanalyzedLogsWritableStream.close());
  }
}
