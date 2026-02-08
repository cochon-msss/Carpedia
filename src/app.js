const express = require("express");
const path = require("path");
const app = express();
const logger = require("./middlewares/loggerMiddleware");
const applySecurityMiddleware = require("./middlewares/securityMiddleware");

applySecurityMiddleware(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 서빙
app.use(express.static("public"));

// 라우터 불러오기
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

module.exports = app;
