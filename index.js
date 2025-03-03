const express = require("express"); // express 모듈 셋팅
const ejs = require("ejs"); // page loading
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync("/Users/cuddle/rootca.key"),
  cert: fs.readFileSync("/Users/cuddle/rootca.crt"),
};

// view 엔진을 ejs를 쓰겠다는 설정
app.set("view engine", "ejs");
app.use(express.static("./views/css"));

// 페이지 로딩 함수
app.get("/", function (req, res) {
  res.render("./ejs/index", {});
});

http.createServer(app).listen(HTTP_PORT, function () {
  console.log("serveer running");
});
https.createServer(options, app).listen(HTTPS_PORT);
