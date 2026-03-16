const dbHelper = require("../utils/dbHelper");

// 정적 파일 확장자 패턴
const STATIC_EXTENSIONS = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|webp|glb)$/i;

// 방문 기록 미들웨어 (실제 페이지 방문만 기록)
const visitLogger = (req, res, next) => {
  const isAdmin = req.session && req.session.user && req.session.user.role === "admin";
  if (req.method === "GET" && !STATIC_EXTENSIONS.test(req.path) && !req.xhr && !isAdmin) {
    const userSeq = req.session.user ? req.session.user.userSeq : null;
    const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = (req.headers["user-agent"] || "").substring(0, 500);

    // 비동기로 기록 (응답 차단하지 않음)
    dbHelper.query(
      `INSERT INTO visit_logs (path, method, user_seq, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`,
      [req.path, req.method, userSeq, ipAddress, userAgent]
    ).catch(() => {});
  }
  next();
};

module.exports = { visitLogger };
