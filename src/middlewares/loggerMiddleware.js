const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const logger = winston.createLogger({
  level: "info", // 로그 레벨
  format: winston.format.combine(
    winston.format.label({ label: "[carpedia access]" }),
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
      dirname: "logs/access",
      filename: `%DATE%_access.log`,
      maxFiles: 30,
      datePattern: "YYYY-MM-DD",
    }),
  ],
});

module.exports = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
