const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./app");
const logger = require("./utils/loggerUtil");
require("dotenv").config();

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("/Users/cuddle/rootca.key"),
  cert: fs.readFileSync("/Users/cuddle/rootca.crt"),
};

http.createServer(app).listen(HTTP_PORT, () => {
  logger.info("HTTP Server listening on " + HTTP_PORT);
});

https.createServer(options, app).listen(HTTPS_PORT, () => {
  logger.info("HTTPS Server listening on " + HTTPS_PORT);
});
