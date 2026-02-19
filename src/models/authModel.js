const dbHelper = require("../utils/dbHelper");

// 이메일로 사용자 조회
const findByEmail = async (email) => {
  return await dbHelper.query(
    `SELECT user_seq AS userSeq,
            user_email AS email,
            user_pw AS password,
            nick_name AS nickname,
            create_at AS createAt
       FROM users
      WHERE user_email = ? AND use_flag = 'Y'`,
    [email]
  );
};

// 닉네임 중복 확인
const findByNickname = async (nickname) => {
  return await dbHelper.query(
    `SELECT user_seq AS userSeq FROM users WHERE nick_name = ? AND use_flag = 'Y'`,
    [nickname]
  );
};

// 이메일 중복 확인
const findByEmailExists = async (email) => {
  return await dbHelper.query(
    `SELECT user_seq AS userSeq FROM users WHERE user_email = ? AND use_flag = 'Y'`,
    [email]
  );
};

// 회원가입
const createUser = async (email, hashedPassword, nickname) => {
  return await dbHelper.query(
    `INSERT INTO users (user_email, user_pw, nick_name) VALUES (?, ?, ?)`,
    [email, hashedPassword, nickname]
  );
};

module.exports = { findByEmail, findByNickname, findByEmailExists, createUser };
