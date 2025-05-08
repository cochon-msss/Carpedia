const carInfoService = require("../services/carInfoService");
const logger = require("../utils/loggerUtil");

// 자동차 상세 정보 조회
const getCarInfo = async (req, res) => {
  try {
    const { trimSeq } = req.query;
    const carInfo = carInfoService.getCarInfo();
    res.render("carInfo", carInfo);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getCarInfo };
