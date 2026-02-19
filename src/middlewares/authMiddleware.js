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

module.exports = { requireLogin, requireLoginApi };
