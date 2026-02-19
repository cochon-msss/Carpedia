const express = require("express");
const router = express.Router();
const { getPostDetail } = require("../controllers/communityController");

router.get("/:postSeq", getPostDetail);

module.exports = router;
