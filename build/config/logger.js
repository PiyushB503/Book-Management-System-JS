"use strict";
// // logger.ts
// import { createLogger, transports, format } from 'winston';
// import 'winston-daily-rotate-file';
// import fs from 'fs';
// import path from 'path';
// const logDirectory = path.join(__dirname, 'logs');
// // Ensure the logs directory exists
// if (!fs.existsSync(logDirectory)) {
//   fs.mkdirSync(logDirectory);
// }
// const transport = new transports.DailyRotateFile({
//   filename: `${logDirectory}/application-%DATE%.log`,
//   datePattern: 'YYYY-MM-DD',
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '14d',
// });
// const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
//   ),
//   transports: [
//     new transports.Console({
//       format: format.combine(format.colorize(), format.simple()),
//     }),
//     transport,
//   ],
// });
// export default logger;
