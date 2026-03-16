const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
  getLoginPage,
  getRegisterPage,
  login,
  register,
  logout,
} = require("../controllers/authController");

// 로그인 시도: 15분 동안 최대 10회
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "너무 많은 로그인 시도입니다. 잠시 후 다시 시도해주세요." },
  skipSuccessfulRequests: true,
});

// 회원가입: 1시간 동안 최대 5회
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "너무 많은 회원가입 시도입니다. 잠시 후 다시 시도해주세요." },
});

router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);
router.post("/login", loginLimiter, login);
router.post("/register", registerLimiter, register);
router.post("/logout", logout);

module.exports = router;
