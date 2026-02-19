const express = require("express");
const router = express.Router();
const { requireLogin, requireLoginApi } = require("../middlewares/authMiddleware");
const {
  getNotificationPage,
  getUnreadCount,
  markAsReadAndRedirect,
  markAllAsRead,
} = require("../controllers/notificationController");

router.get("/", requireLogin, getNotificationPage);
router.get("/unread-count", requireLoginApi, getUnreadCount);
router.get("/:notificationSeq/read", requireLogin, markAsReadAndRedirect);
router.post("/read-all", requireLoginApi, markAllAsRead);

module.exports = router;
