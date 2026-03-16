const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const STATIC_EXTENSIONS = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|webp|glb)$/i;

const logger = winston.createLogger({
  level: "info",
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
    new winston.transports.Console(),
    new winstonDaily({
      dirname: "logs/access",
      filename: `%DATE%_access.log`,
      maxFiles: 30,
      datePattern: "YYYY-MM-DD",
    }),
  ],
});

module.exports = (req, res, next) => {
  // 정적 파일 요청은 로그 제외
  if (STATIC_EXTENSIONS.test(req.path)) {
    return next();
  }

  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });

  next();
};
