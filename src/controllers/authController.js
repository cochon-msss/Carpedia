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
    const result = await authService.login(email, password);
    if (!result.success) {
      return res.status(401).json({ success: false, message: result.message });
    }
    // 세션에 사용자 정보 저장
    req.session.user = result.user;
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 회원가입 처리
const register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
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
      res.json({ success: true });
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getLoginPage, getRegisterPage, login, register, logout };
