const logger = require("../utils/loggerUtil");
const specRankingService = require("../services/specRankingService");

// 제원 랭킹 페이지 렌더링
const getRankingPage = async (req, res) => {
  try {
    res.render("specRanking");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 제원 랭킹 목록 JSON API
const getRankingListJson = async (req, res) => {
  try {
    const { category } = req.query;
    const list = await specRankingService.getRankingList(category || "efficiency");
    res.json(list);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getRankingPage, getRankingListJson };
