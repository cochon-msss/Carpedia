const express = require("express");
const router = express.Router();
const { getCostCalcPage } = require("../controllers/costCalcController");

router.get("/", getCostCalcPage);

module.exports = router;
