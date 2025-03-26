const db = require("../config/db");

const query = async (sql, params = []) => {
  try {
    return await db.query(sql, params);
  } catch (error) {
    throw new Error("Database query failed : " + error.message); // 에러를 던짐
  }
};

module.exports = { query };
