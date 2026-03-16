const carInfoService = require("../services/carInfoService");
const logger = require("../utils/loggerUtil");
const { validatePositiveInt } = require("../utils/validateParam");

// 자동차 트림 목록 조회
const getTrimList = async (req, res) => {
  try {
    const generationSeq = validatePositiveInt(req.query.generationSeq);
    if (!generationSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const carTrimList = await carInfoService.getTrimList(generationSeq);
    const carMeta = carTrimList.length > 0 ? {
      modelName: carTrimList[0].modelName,
      generationName: carTrimList[0].generationName,
      bodyType: carTrimList[0].bodyType,
      manufacturerName: carTrimList[0].manufacturerName,
      logoUrl: carTrimList[0].logoUrl
    } : {};
    res.render("carInfo/carInfo", { carTrimList, carMeta });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 자동차 상세 정보 조회
const getCarInfoDetail = async (req, res) => {
  try {
    const trimSeq = validatePositiveInt(req.query.trimSeq);
    if (!trimSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const [carInfoDetail] = await carInfoService.getCarInfoDetail(trimSeq);
    res.render("carInfo/carInfoDetail", { carInfoDetail });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTrimList, getCarInfoDetail };
