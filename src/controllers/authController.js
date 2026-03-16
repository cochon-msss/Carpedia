const authService = require("../services/authService");
const logger = require("../utils/loggerUtil");

// 로그인 페이지
const getLoginPage = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 회원가입 페이지
const getRegisterPage = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 로그인 처리
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 기본 입력 검증
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return res.status(400).json({ success: false, message: "잘못된 요청입니다." });
    }
    const result = await authService.login(email, password);
    if (!result.success) {
      return res.status(401).json({ success: false, message: result.message });
    }
    // 세션 고정 공격 방지: 로그인 시 세션 ID 재발급
    const userData = result.user;
    req.session.regenerate((err) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      req.session.user = userData;
      res.json({ success: true, role: userData.role });
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 회원가입 처리
const register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    // 기본 입력 검증
    if (!email || typeof email !== "string" || !password || typeof password !== "string" || !nickname || typeof nickname !== "string") {
      return res.status(400).json({ success: false, message: "잘못된 요청입니다." });
    }
    const result = await authService.register(email, password, nickname);
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 로그아웃 처리
const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({ error: "로그아웃 실패" });
      }
      // 쿠키 명시적 삭제
      res.clearCookie("connect.sid", { path: "/" });
      res.json({ success: true });
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getLoginPage, getRegisterPage, login, register, logout };
