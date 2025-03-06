const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const logger = winston.createLogger({
  level: "info", // 로그 레벨
  format: winston.format.combine(
    winston.format.label({ label: "[cochon-server service]" }),
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(({ timestamp, level, message, label }) => {
      return `${timestamp} - ${level} : ${label} ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), //콘솔에 출력
    new winstonDaily({
      dirname: "logs/service",
      filename: `%DATE%_service.log`,
      maxFiles: 30,
      datePattern: "YYYY-MM-DD",
    }),
  ],
});

module.exports = logger;
