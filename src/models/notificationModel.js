const dbHelper = require("../utils/dbHelper");

// 알림 생성
const createNotification = async (userSeq, type, referenceSeq, content) => {
  return await dbHelper.query(
    `INSERT INTO notifications (user_seq, type, reference_seq, content) VALUES (?, ?, ?, ?)`,
    [userSeq, type, referenceSeq, content]
  );
};

// 알림 목록 조회
const getNotificationList = async (userSeq, offset, limit) => {
  return await dbHelper.query(
    `SELECT notification_seq AS notificationSeq,
            user_seq AS userSeq,
            type,
            reference_seq AS referenceSeq,
            content,
            is_read AS isRead,
            create_at AS createAt
       FROM notifications
      WHERE user_seq = ?
      ORDER BY create_at DESC
      LIMIT ? OFFSET ?`,
    [userSeq, limit, offset]
  );
};

// 알림 수 조회
const getNotificationCount = async (userSeq) => {
  return await dbHelper.query(
    `SELECT COUNT(*) AS totalCount FROM notifications WHERE user_seq = ?`,
    [userSeq]
  );
};

// 읽지 않은 알림 수 조회
const getUnreadCount = async (userSeq) => {
  return await dbHelper.query(
    `SELECT COUNT(*) AS unreadCount FROM notifications WHERE user_seq = ? AND is_read = 0`,
    [userSeq]
  );
};

// 단건 읽음 처리
const markAsRead = async (notificationSeq, userSeq) => {
  return await dbHelper.query(
    `UPDATE notifications SET is_read = 1 WHERE notification_seq = ? AND user_seq = ?`,
    [notificationSeq, userSeq]
  );
};

// 모두 읽음 처리
const markAllAsRead = async (userSeq) => {
  return await dbHelper.query(
    `UPDATE notifications SET is_read = 1 WHERE user_seq = ? AND is_read = 0`,
    [userSeq]
  );
};

module.exports = {
  createNotification,
  getNotificationList,
  getNotificationCount,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
