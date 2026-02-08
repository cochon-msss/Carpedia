const mysql = require("mysql2/promise");
const logger = require("../utils/loggerUtil");

const client = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "carpidia",
  password: "",
  port: 3306,
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
