const { Client } = require("pg");
const logger = require("../utils/loggerUtil");
require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

client
  .connect()
  .then(() => logger.info("PostgreSQL Connection"))
  .catch((err) => logger.error("PostgreSQL Connection Error: " + err));

// 모듈화 다른 곳에서 client를 사용하려고
module.exports = client;
