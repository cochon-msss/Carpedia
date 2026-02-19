const express = require("express");
const router = express.Router();
const {
  getLoginPage,
  getRegisterPage,
  login,
  register,
  logout,
} = require("../controllers/authController");

router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
