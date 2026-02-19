const express = require("express");
const router = express.Router();
const { getRankingPage, getRankingListJson } = require("../controllers/specRankingController");

router.get("/", getRankingPage);
router.get("/list", getRankingListJson);

module.exports = router;
