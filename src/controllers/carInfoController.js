const carInfoService = require("../services/carInfoService");
const logger = require("../utils/loggerUtil");

// 자동차 트림 목록 조회
const getTrimList = async (req, res) => {
  try {
    const { generationSeq } = req.query;
    const carTrimList = await carInfoService.getTrimList(generationSeq);
    res.render("carInfo/carInfo", { carTrimList });
  } catch (error) {
    logger.error(error);
  }
};

// 자동차 상세 정보 조회
const getCarInfoDetail = async (req, res) => {
  try {
    const { trimSeq } = req.query;
    const [carInfoDetail] = await carInfoService.getCarInfoDetail(trimSeq);
    res.render("carInfo/carInfoDetail", { carInfoDetail });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getTrimList, getCarInfoDetail };
