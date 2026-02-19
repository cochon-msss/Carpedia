const express = require("express");
const router = express.Router();
const {
  getComparePage,
  getManufacturerListJson,
  getTrimListJson,
  getCarSpecJson,
} = require("../controllers/carCompareController");

router.get("/", getComparePage);
router.get("/manufacturers", getManufacturerListJson);
router.get("/trims", getTrimListJson);
router.get("/spec", getCarSpecJson);

module.exports = router;
