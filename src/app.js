const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const logger = require("./middlewares/loggerMiddleware");
const applySecurityMiddleware = require("./middlewares/securityMiddleware");
const db = require("./config/db");

applySecurityMiddleware(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 설정
const sessionStore = new MySQLStore({}, db);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "carpedia-session-secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 24시간
    },
  })
);

// 모든 뷰에서 세션 사용자 정보 접근 가능하도록 설정
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(logger);

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 서빙
app.use(express.static("public"));

// 라우터 불러오기
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// multer 에러 핸들링
const multer = require("multer");
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "파일 크기는 5MB 이하만 가능합니다." });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ success: false, message: "최대 20장까지 업로드 가능합니다." });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ success: false, message: "이미지 파일만 업로드 가능합니다. (JPG, PNG, GIF, WebP)" });
    }
    return res.status(400).json({ success: false, message: "파일 업로드 중 오류가 발생했습니다." });
  }
  next(err);
});

module.exports = app;
