const express = require("express");
const path = require("path");
const app = express();

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("view", path.join(__dirname, "views"));

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, "public")));

// 라우터 불러오기
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

module.exports = app;
