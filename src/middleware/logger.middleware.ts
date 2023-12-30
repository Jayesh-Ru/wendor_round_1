import { Request, Response, NextFunction } from 'express';
import { LogLevel, Logger } from 'src/utils/logger';

export function simpleFunc(req: Request, res: Response, next: NextFunction) {
  const requestLogFilePath = 'request.log';
  const requestLogLevel = LogLevel.INFO;
  const fileLogger = new Logger(requestLogFilePath, requestLogLevel);

  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const requestBody =
    req.method === 'POST' || req.method === 'PUT'
      ? JSON.stringify(req.body)
      : '';

  const logMessage = `time: ${timestamp} Method: ${method} | URL: ${url} | Request Body: ${requestBody}`;
  try {
    fileLogger.info(logMessage);
  } catch (error: any) {
    const errorMessage = `Error processing request: ${error.message}`;
    fileLogger.error(errorMessage);

    // res.status(500).json({ error: 'Internal Server Error' } as any);
  }

  console.log('Executing request after the function middleware...');
  next();
}
