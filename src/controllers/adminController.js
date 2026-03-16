const adminService = require("../services/adminService");
const logger = require("../utils/loggerUtil");

// 관리자 대시보드 페이지
const getAdminPage = async (req, res) => {
  try {
    res.render("admin");
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 방문 통계 API
const getVisitStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: "기간을 지정해주세요." });
    }
    const result = await adminService.getVisitStats(startDate, endDate);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 요약 통계 API
const getSummaryStats = async (req, res) => {
  try {
    const result = await adminService.getSummaryStats();
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 신고 목록 API
const getReportList = async (req, res) => {
  try {
    const result = await adminService.getReportList();
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 신고 처리 API
const handleReport = async (req, res) => {
  try {
    const { reportSeq } = req.params;
    const { action } = req.body;
    if (!reportSeq || !action || typeof action !== "string") {
      return res.status(400).json({ success: false, message: "잘못된 요청입니다." });
    }
    const result = await adminService.handleReport(parseInt(reportSeq, 10), action);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 로그 조회 API
const getLogs = async (req, res) => {
  try {
    const { date, type } = req.query;
    if (!date || typeof date !== "string") {
      return res.status(400).json({ success: false, message: "날짜를 지정해주세요." });
    }
    const result = await adminService.getLogContent(date, type);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 신규 가입자 추이 API
const getSignupStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: "기간을 지정해주세요." });
    }
    const result = await adminService.getSignupStats(startDate, endDate);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 최근 커뮤니티 활동 API
const getRecentActivity = async (req, res) => {
  try {
    const result = await adminService.getRecentActivity();
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 사용자 목록 API
const getUserList = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const keyword = (req.query.keyword || "").trim() || null;
    const result = await adminService.getUserList(page, 15, keyword);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 사용자 차단/해제 API
const toggleUserStatus = async (req, res) => {
  try {
    const { userSeq } = req.params;
    const { action } = req.body;
    if (!userSeq || !["ban", "unban"].includes(action)) {
      return res.status(400).json({ success: false, message: "잘못된 요청입니다." });
    }
    const result = await adminService.toggleUserStatus(parseInt(userSeq, 10), action);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAdminPage, getVisitStats, getSummaryStats, getReportList, handleReport, getLogs,
  getSignupStats, getRecentActivity, getUserList, toggleUserStatus,
};
