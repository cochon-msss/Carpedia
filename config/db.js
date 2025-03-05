const { Client } = require("pg");

const client = new Client({
  user: "cuddle",
  host: "127.0.0.1",
  database: "nodedb",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("PostgreSQL Connection"))
  .catch((err) => console.error("PostgreSQL Connection Error: " + err));

module.exports = client;
