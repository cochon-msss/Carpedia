const logger = require("../utils/loggerUtil");

const getBodyTypeGuide = async (req, res) => {
  try {
    res.render("bodyTypeGuide");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getBodyTypeGuide };
