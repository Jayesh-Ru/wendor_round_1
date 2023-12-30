import * as fs from 'fs';

// Enum representing different logging levels
export enum LogLevel {
  INFO = 'info',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
}

export class Logger {
  private filePath: string;
  private logLevel: LogLevel;

  constructor(filePath: string, logLevel: LogLevel = LogLevel.INFO) {
    this.filePath = filePath;
    this.logLevel = logLevel;
  }

  public log(level: LogLevel, message: string): void {
    if (
      Object.values(LogLevel).indexOf(level) >=
      Object.values(LogLevel).indexOf(this.logLevel)
    ) {
      const logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;

      fs.appendFile(this.filePath, logMessage, (err) => {
        if (err) {
          console.error('Error writing to the log file:', err);
        }
      });
    }
  }

  public info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  public debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }

  public warn(message: string): void {
    this.log(LogLevel.WARN, message);
  }

  public error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }
}
