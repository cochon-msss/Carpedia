const reportModel = require("../models/reportModel");
const logger = require("../utils/loggerUtil");

// 신고 생성 (중복 체크 후)
const createReport = async (targetType, targetSeq, userSeq, reason) => {
  try {
    const existing = await reportModel.checkReport(targetType, targetSeq, userSeq);
    if (existing && existing.length > 0) {
      return { success: false, message: "이미 신고한 항목입니다." };
    }
    await reportModel.createReport(targetType, targetSeq, userSeq, reason);
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { createReport };
