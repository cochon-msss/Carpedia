const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const logger = require("./middlewares/loggerMiddleware");
const { applyBaseSecurityMiddleware, csrfTokenMiddleware, csrfProtection } = require("./middlewares/securityMiddleware");
const db = require("./config/db");

// 세션 시크릿 검증
if (!process.env.SESSION_SECRET) {
  console.error("FATAL: SESSION_SECRET 환경변수가 설정되지 않았습니다.");
  process.exit(1);
}

applyBaseSecurityMiddleware(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 설정
const sessionStore = new MySQLStore({}, db);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 24시간
    },
  })
);

// 모든 뷰에서 세션 사용자 정보 접근 가능하도록 설정
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// CSRF 미들웨어 (세션 이후 등록)
app.use(csrfTokenMiddleware);
app.use(csrfProtection);

app.use(logger);

// HTML 이스케이프 헬퍼 (EJS 템플릿에서 사용)
app.locals.escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 서빙
app.use(express.static("public"));

// 방문 기록 미들웨어 (라우터 이전, 정적 파일 이후)
const { visitLogger } = require("./middlewares/visitMiddleware");
app.use(visitLogger);

// 관리자 전용 리다이렉트 (관리자는 일반 페이지 접근 불가)
app.use((req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    // 관리자 페이지, 로그아웃, 정적 파일은 허용
    if (req.path.startsWith("/admin") || req.path === "/auth/logout") {
      return next();
    }
    // API 요청은 403
    if (req.xhr || req.headers.accept === "application/json") {
      return res.status(403).json({ success: false, message: "관리자는 일반 기능에 접근할 수 없습니다." });
    }
    return res.redirect("/admin");
  }
  next();
});

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

// 일반 에러 핸들러
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
