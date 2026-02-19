const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middlewares/authMiddleware");
const { getMypage } = require("../controllers/mypageController");

router.get("/", requireLogin, getMypage);

module.exports = router;
