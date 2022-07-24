import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(winston.format.errors({ stack: true}), winston.format.splat(), winston.format.simple()),
  transports: [new winston.transports.Console()],
});

export default logger;