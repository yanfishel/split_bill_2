const enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const log = (level: LogLevel, message: string, ...args: any[]) => {
  if (__DEV__) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`, ...args);
  }
};

export const logger = {
  debug: (message: string, ...args: any[]) => log(LogLevel.DEBUG, message, ...args),
  info: (message: string, ...args: any[]) => log(LogLevel.INFO, message, ...args),
  warn: (message: string, ...args: any[]) => log(LogLevel.WARN, message, ...args),
  error: (message: string, ...args: any[]) => log(LogLevel.ERROR, message, ...args),
};
