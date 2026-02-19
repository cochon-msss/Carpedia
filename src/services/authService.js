const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const logger = require("../utils/loggerUtil");

const SALT_ROUNDS = 10;

// 회원가입
const register = async (email, password, nickname) => {
  try {
    // 이메일 중복 확인
    const existingEmail = await authModel.findByEmailExists(email);
    if (existingEmail.length > 0) {
      return { success: false, message: "이미 사용 중인 이메일입니다." };
    }
    // 닉네임 중복 확인
    const existingNickname = await authModel.findByNickname(nickname);
    if (existingNickname.length > 0) {
      return { success: false, message: "이미 사용 중인 닉네임입니다." };
    }
    // 비밀번호 해싱 후 저장
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await authModel.createUser(email, hashedPassword, nickname);
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 로그인
const login = async (email, password) => {
  try {
    const users = await authModel.findByEmail(email);
    if (users.length === 0) {
      return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }
    return {
      success: true,
      user: { userSeq: user.userSeq, email: user.email, nickname: user.nickname },
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { register, login };
