const logger = require("../utils/loggerUtil");
const carRecommendService = require("../services/carRecommendService");

// 차량 추천 페이지 렌더링
const getRecommendPage = async (req, res) => {
  try {
    res.render("carRecommend");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 차량 추천 목록 JSON API
const getRecommendListJson = async (req, res) => {
  try {
    const { bodyType, fuelType, sortBy } = req.query;
    const list = await carRecommendService.getRecommendList(
      bodyType || null,
      fuelType || null,
      sortBy || "efficiency"
    );
    res.json(list);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getRecommendPage, getRecommendListJson };
