// require()
// 외부 모듈을 가져온다.
const express = require("express");
const path = require("path");
const app = express();
const db = require("./config/db"); // db.js 불러오기
const logger = require("./middlewares/logger");

app.use(logger); // 모든 요청에 대해 로깅을 기록

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 서빙
app.use(express.static("public"));

// 라우터 불러오기
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

module.exports = app;
