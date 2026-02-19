const notificationModel = require("../models/notificationModel");
const logger = require("../utils/loggerUtil");

// 알림 생성 (자기 자신 제외, 실패 시 메인 플로우 중단 안 함)
const createNotification = async (userSeq, type, referenceSeq, content, triggerUserSeq) => {
  try {
    if (userSeq === triggerUserSeq) return;
    await notificationModel.createNotification(userSeq, type, referenceSeq, content);
  } catch (error) {
    logger.error("알림 생성 실패: " + error.message);
  }
};

// 알림 목록 조회
const getNotificationList = async (userSeq, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    return await notificationModel.getNotificationList(userSeq, offset, pageSize);
  } catch (error) {
    logger.error(error);
  }
};

// 알림 수 조회
const getNotificationCount = async (userSeq) => {
  try {
    const result = await notificationModel.getNotificationCount(userSeq);
    return result[0].totalCount;
  } catch (error) {
    logger.error(error);
  }
};

// 읽지 않은 알림 수 조회
const getUnreadCount = async (userSeq) => {
  try {
    const result = await notificationModel.getUnreadCount(userSeq);
    return result[0].unreadCount;
  } catch (error) {
    logger.error(error);
    return 0;
  }
};

// 단건 읽음 처리
const markAsRead = async (notificationSeq, userSeq) => {
  try {
    await notificationModel.markAsRead(notificationSeq, userSeq);
  } catch (error) {
    logger.error(error);
  }
};

// 모두 읽음 처리
const markAllAsRead = async (userSeq) => {
  try {
    await notificationModel.markAllAsRead(userSeq);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  createNotification,
  getNotificationList,
  getNotificationCount,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
