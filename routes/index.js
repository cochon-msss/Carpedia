const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("ejs/index");
});

module.exports = router;
