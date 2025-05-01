const db = require("../config/db");

const query = async (sql, params = []) => {
  try {
    const [rows] = await db.query(sql, params);
    return rows; // 여기서 rows만 반환
  } catch (error) {
    throw new Error("Database query failed : " + error.message); // 에러를 던짐
  }
};

module.exports = { query };
