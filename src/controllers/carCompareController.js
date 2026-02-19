const manufacturerService = require("../services/manufacturerService");
const carInfoService = require("../services/carInfoService");
const logger = require("../utils/loggerUtil");

// 비교 페이지 렌더링
const getComparePage = async (req, res) => {
  try {
    res.render("carCompare");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 제조사 목록 JSON
const getManufacturerListJson = async (req, res) => {
  try {
    const manufacturers = await manufacturerService.getManufacturerList();
    res.json(manufacturers);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 트림 목록 JSON
const getTrimListJson = async (req, res) => {
  try {
    const { generationSeq } = req.query;
    const trimList = await carInfoService.getTrimList(generationSeq);
    res.json(trimList);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 트림 상세 제원 JSON
const getCarSpecJson = async (req, res) => {
  try {
    const { trimSeq } = req.query;
    const [specDetail] = await carInfoService.getCarInfoDetail(trimSeq);
    res.json(specDetail);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getComparePage, getManufacturerListJson, getTrimListJson, getCarSpecJson };
