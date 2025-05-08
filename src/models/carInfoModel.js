const dbHelper = require("../utils/dbHelper");

// 자동차 상세 정보 조회
const getCarInfo = async (trimSeq) => {
  return dbHelper.query();
};

module.exports = { getCarInfo };
