const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
require("dotenv").config();
const app = require("./app");
const logger = require("./utils/loggerUtil");

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

// SSL 인증서가 있으면 HTTPS + HTTP 리다이렉트, 없으면 HTTP만 실행
const hasSSL = process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH
  && fs.existsSync(process.env.SSL_KEY_PATH) && fs.existsSync(process.env.SSL_CERT_PATH);

if (hasSSL) {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };

  // HTTP → HTTPS 리다이렉트 서버
  const redirectApp = express();
  redirectApp.use((req, res) => {
    const host = req.headers.host ? req.headers.host.replace(/:\d+$/, "") : "localhost";
    res.redirect(301, "https://" + host + ":" + HTTPS_PORT + req.url);
  });

  http.createServer(redirectApp).listen(HTTP_PORT, () => {
    logger.info("HTTP redirect server listening on " + HTTP_PORT);
  });

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    logger.info("HTTPS Server listening on " + HTTPS_PORT);
  });
} else {
  // SSL 없이 HTTP만 실행 (Render 등 PaaS 환경)
  http.createServer(app).listen(HTTP_PORT, () => {
    logger.info("HTTP Server listening on " + HTTP_PORT);
  });
}
