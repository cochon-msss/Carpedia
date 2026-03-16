const express = require("express");
const router = express.Router();
const { requireLogin, requireAdmin, requireAdminApi } = require("../middlewares/authMiddleware");
const {
  getAdminPage,
  getVisitStats,
  getSummaryStats,
  getReportList,
  handleReport,
  getLogs,
  getSignupStats,
  getRecentActivity,
  getUserList,
  toggleUserStatus,
} = require("../controllers/adminController");

// 관리자 대시보드 페이지
router.get("/", requireLogin, requireAdmin, getAdminPage);

// 관리자 API (JSON)
router.get("/stats/visits", requireLogin, requireAdminApi, getVisitStats);
router.get("/stats/summary", requireLogin, requireAdminApi, getSummaryStats);
router.get("/stats/signups", requireLogin, requireAdminApi, getSignupStats);
router.get("/reports", requireLogin, requireAdminApi, getReportList);
router.patch("/reports/:reportSeq", requireLogin, requireAdminApi, handleReport);
router.get("/logs", requireLogin, requireAdminApi, getLogs);
router.get("/activity", requireLogin, requireAdminApi, getRecentActivity);
router.get("/users", requireLogin, requireAdminApi, getUserList);
router.patch("/users/:userSeq", requireLogin, requireAdminApi, toggleUserStatus);

module.exports = router;
