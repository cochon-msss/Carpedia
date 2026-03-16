const manufacturerService = require("../services/manufacturerService");
const logger = require("../utils/loggerUtil");
const { validatePositiveInt } = require("../utils/validateParam");

// 제조사 목록 조회
const getManufacturerList = async (req, res) => {
  try {
    const manufacturers = await manufacturerService.getManufacturerList();
    res.render("index", { manufacturers });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 모델 목록 조회
const getModelList = async (req, res) => {
  try {
    const manufacturerSeq = validatePositiveInt(req.params.manufacturerSeq);
    if (!manufacturerSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const modelList = await manufacturerService.getModelList(manufacturerSeq);
    res.json(modelList);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 세부 모델 목록 조회
const getGenerationList = async (req, res) => {
  try {
    const modelSeq = validatePositiveInt(req.params.modelSeq);
    if (!modelSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const generationList = await manufacturerService.getGenerationList(modelSeq);
    res.json(generationList);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getManufacturerList, getModelList, getGenerationList };
