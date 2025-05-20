const express = require("express");
const router = express.Router();
const {
  getTrimList,
  getCarInfoDetail,
} = require("../controllers/carInfoController");

// /carInfo 경로 route

router.get("/", getTrimList);
router.get("/detail", getCarInfoDetail);

module.exports = router;
