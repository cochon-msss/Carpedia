const express = require("express");
const router = express.Router();
const { getBodyTypeGuide } = require("../controllers/bodyTypeGuideController");

router.get("/", getBodyTypeGuide);

module.exports = router;
