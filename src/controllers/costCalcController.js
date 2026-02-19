const logger = require("../utils/loggerUtil");

// 유지비 계산기 페이지 렌더링
const getCostCalcPage = async (req, res) => {
  try {
    res.render("costCalc");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCostCalcPage };
