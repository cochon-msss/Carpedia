// 로그인 필수 (페이지 요청 - 리다이렉트)
const requireLogin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
};

// 로그인 필수 (API 요청 - JSON 응답)
const requireLoginApi = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: "로그인이 필요합니다." });
  }
  next();
};

// 관리자 권한 확인 (페이지 요청 - 리다이렉트)
const requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.user || req.session.user.role !== "admin") {
    return res.redirect("/");
  }
  next();
};

// 관리자 권한 확인 (API 요청 - JSON 응답)
const requireAdminApi = (req, res, next) => {
  if (!req.session || !req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "관리자 권한이 필요합니다." });
  }
  next();
};

module.exports = { requireLogin, requireLoginApi, requireAdmin, requireAdminApi };
