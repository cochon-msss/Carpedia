const carInfoService = require("../services/carInfoService");
const logger = require("../utils/loggerUtil");

// 자동차 상세 정보 조회
const getCarInfo = async (req, res) => {
  try {
    const { generationSeq } = req.query;
    const carTrimList = await carInfoService.getTrimList(generationSeq);
    res.render("carInfo", { carTrimList });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getCarInfo };
