const fs = require("fs");
const http = require("http");
const https = require("https");
require("dotenv").config();
const app = require("./app");
const logger = require("./utils/loggerUtil");

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
};

http.createServer(app).listen(HTTP_PORT, () => {
  logger.info("HTTP Server listening on " + HTTP_PORT);
});

https.createServer(options, app).listen(HTTPS_PORT, () => {
  logger.info("HTTPS Server listening on " + HTTPS_PORT);
});
