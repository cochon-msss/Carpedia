const helmet = require("helmet");
const xssClean = require("xss-clean");
const crypto = require("crypto");

// 기존 helmet + xss-clean 적용
const applyBaseSecurityMiddleware = (app) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://ajax.googleapis.com", "https://cdn.jsdelivr.net"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
          fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
          connectSrc: ["'self'", "https://cdn.jsdelivr.net"],
          imgSrc: ["'self'", "data:", "blob:"],
        },
      },
    })
  );
  app.use(xssClean());
};

// CSRF 토큰 생성 (세션 필요 — session 미들웨어 이후 등록)
const csrfTokenMiddleware = (req, res, next) => {
  if (req.session && !req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");
  }
  res.locals.csrfToken = req.session ? req.session.csrfToken : "";
  next();
};

// CSRF 검증 (POST/PUT/DELETE/PATCH)
const csrfProtection = (req, res, next) => {
  if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
    const token = req.headers["x-csrf-token"];
    if (!token || !req.session || token !== req.session.csrfToken) {
      return res.status(403).json({ success: false, message: "CSRF 토큰이 유효하지 않습니다." });
    }
  }
  next();
};

module.exports = { applyBaseSecurityMiddleware, csrfTokenMiddleware, csrfProtection };
