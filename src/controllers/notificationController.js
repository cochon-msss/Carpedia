const notificationService = require("../services/notificationService");
const logger = require("../utils/loggerUtil");

const PAGE_SIZE = 20;

// 알림 페이지 렌더링
const getNotificationPage = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const currentPage = parseInt(page);
    const { userSeq } = req.session.user;
    const notificationList = await notificationService.getNotificationList(userSeq, currentPage, PAGE_SIZE);
    const totalCount = await notificationService.getNotificationCount(userSeq);
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    res.render("notification", { notificationList, currentPage, totalPages });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 읽지 않은 알림 수 API
const getUnreadCount = async (req, res) => {
  try {
    const { userSeq } = req.session.user;
    const unreadCount = await notificationService.getUnreadCount(userSeq);
    res.json({ success: true, unreadCount });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 단건 읽음 처리 + 게시글 이동
const markAsReadAndRedirect = async (req, res) => {
  try {
    const { notificationSeq } = req.params;
    const { userSeq } = req.session.user;
    await notificationService.markAsRead(notificationSeq, userSeq);
    const { referenceSeq } = req.query;
    if (referenceSeq) {
      return res.redirect("/communityDetail/" + referenceSeq);
    }
    res.redirect("/notification");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 모두 읽음 처리
const markAllAsRead = async (req, res) => {
  try {
    const { userSeq } = req.session.user;
    await notificationService.markAllAsRead(userSeq);
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getNotificationPage, getUnreadCount, markAsReadAndRedirect, markAllAsRead };
