export enum LogLevel {
   ERROR = 0,
   WARN = 1,
   INFO = 2,
   DEBUG = 3,
}

export interface LogEntry {
   timestamp: string;
   level: LogLevel;
   message: string;
   data?: any;
   component?: string;
   error?: Error;
}

export class Logger {
   private static instance: Logger;
   private logLevel: LogLevel = LogLevel.INFO;

   private constructor() {
      this.logLevel = this.getLogLevelFromEnv();
   }

   public static getInstance(): Logger {
      if (!Logger.instance) {
         Logger.instance = new Logger();
      }
      return Logger.instance;
   }

   private getLogLevelFromEnv(): LogLevel {
      const envLevel = process.env.LOG_LEVEL?.toUpperCase();
      switch (envLevel) {
         case 'DEBUG':
            return LogLevel.DEBUG;
         case 'INFO':
            return LogLevel.INFO;
         case 'WARN':
            return LogLevel.WARN;
         case 'ERROR':
            return LogLevel.ERROR;
         default:
            return LogLevel.INFO;
      }
   }

   private shouldLog(level: LogLevel): boolean {
      return level <= this.logLevel;
   }

   private formatLogEntry(entry: LogEntry): string {
      const levelName = LogLevel[entry.level];
      let logMessage = `[${entry.timestamp}] [${levelName}]`;

      if (entry.component) {
         logMessage += ` [${entry.component}]`;
      }

      logMessage += ` ${entry.message}`;

      if (entry.data) {
         logMessage += ` | Data: ${JSON.stringify(entry.data, null, 2)}`;
      }

      if (entry.error) {
         logMessage += ` | Error: ${entry.error.message}`;
         if (entry.error.stack) {
            logMessage += `\nStack: ${entry.error.stack}`;
         }
      }

      return logMessage;
   }

   private log(level: LogLevel, message: string, data?: any, component?: string, error?: Error): void {
      if (!this.shouldLog(level)) {
         return;
      }

      const entry: LogEntry = {
         timestamp: new Date().toISOString(),
         level,
         message,
         data,
         component,
         error,
      };

      const formattedMessage = this.formatLogEntry(entry);

      switch (level) {
         case LogLevel.ERROR:
            console.error(formattedMessage);
            break;
         case LogLevel.WARN:
            console.warn(formattedMessage);
            break;
         case LogLevel.INFO:
            console.info(formattedMessage);
            break;
         case LogLevel.DEBUG:
            console.debug(formattedMessage);
            break;
      }
   }

   public error(message: string, error?: Error, component?: string, data?: any): void {
      this.log(LogLevel.ERROR, message, data, component, error);
   }

   public warn(message: string, component?: string, data?: any): void {
      this.log(LogLevel.WARN, message, data, component);
   }

   public info(message: string, component?: string, data?: any): void {
      this.log(LogLevel.INFO, message, data, component);
   }

   public debug(message: string, component?: string, data?: any): void {
      this.log(LogLevel.DEBUG, message, data, component);
   }

   public setLogLevel(level: LogLevel): void {
      this.logLevel = level;
   }

   public getLogLevel(): LogLevel {
      return this.logLevel;
   }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Convenience functions for easier usage
export const logError = (message: string, error?: Error, component?: string, data?: any) => {
   logger.error(message, error, component, data);
};

export const logWarn = (message: string, component?: string, data?: any) => {
   logger.warn(message, component, data);
};

export const logInfo = (message: string, component?: string, data?: any) => {
   logger.info(message, component, data);
};

export const logDebug = (message: string, component?: string, data?: any) => {
   logger.debug(message, component, data);
};
