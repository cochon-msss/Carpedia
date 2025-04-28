const mysql = require("mysql2/promise");
const logger = require("../utils/loggerUtil");
require("dotenv").config();

const client = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // MySQL은 비번 필요
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

client
  .getConnection()
  .then(() => logger.info("MySQL Connection Successful"))
  .catch((err) => logger.error("MySQL Connection Error: " + err));

// 다른 곳에서 사용할 수 있도록 export
module.exports = client;
