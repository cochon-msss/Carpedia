const express = require("express");
const router = express.Router();
const { getCarInfo } = require("../controllers/carInfoController");

// /carInfo 경로 route

router.get("/", getCarInfo);

module.exports = router;
