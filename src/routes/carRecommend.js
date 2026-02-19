const express = require("express");
const router = express.Router();
const { getRecommendPage, getRecommendListJson } = require("../controllers/carRecommendController");

router.get("/", getRecommendPage);
router.get("/list", getRecommendListJson);

module.exports = router;
