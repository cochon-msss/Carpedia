const dbHelper = require("../utils/dbHelper");

// 신고 생성
const createReport = async (targetType, targetSeq, userSeq, reason) => {
  return await dbHelper.query(
    `INSERT INTO reports (target_type, target_seq, user_seq, reason) VALUES (?, ?, ?, ?)`,
    [targetType, targetSeq, userSeq, reason]
  );
};

// 신고 중복 확인
const checkReport = async (targetType, targetSeq, userSeq) => {
  return await dbHelper.query(
    `SELECT report_seq AS reportSeq FROM reports WHERE target_type = ? AND target_seq = ? AND user_seq = ?`,
    [targetType, targetSeq, userSeq]
  );
};

module.exports = { createReport, checkReport };
