const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./app");

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("/Users/cuddle/rootca.key"),
  cert: fs.readFileSync("/Users/cuddle/rootca.crt"),
};

http.createServer(app).listen(HTTP_PORT, () => {
  console.log("HTTP Server listening on " + HTTP_PORT);
});

https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log("HTTPS server listening on " + HTTPS_PORT);
});
