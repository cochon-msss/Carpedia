const adminModel = require("../models/adminModel");
const logger = require("../utils/loggerUtil");
const fs = require("fs");
const path = require("path");

// 방문 통계 조회
const getVisitStats = async (startDate, endDate) => {
  try {
    const [dailyVisits, hourlyVisits] = await Promise.all([
      adminModel.getDailyVisits(startDate, endDate),
      adminModel.getHourlyVisits(startDate, endDate),
    ]);
    return { success: true, dailyVisits, hourlyVisits };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 대시보드 요약 통계
const getSummaryStats = async () => {
  try {
    const [todayVisits, totalUsers, totalPosts, pendingReports] = await Promise.all([
      adminModel.getTodayVisits(),
      adminModel.getTotalUsers(),
      adminModel.getTotalPosts(),
      adminModel.getPendingReportCount(),
    ]);
    return { success: true, todayVisits, totalUsers, totalPosts, pendingReports };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 신고 목록 조회
const getReportList = async () => {
  try {
    const reports = await adminModel.getReportList();
    return { success: true, reports };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 신고 처리
const handleReport = async (reportSeq, action) => {
  try {
    if (action === "resolve") {
      // 신고 승인: 대상 콘텐츠 soft delete + 상태 변경
      const targets = await adminModel.getReportTarget(reportSeq);
      if (targets.length === 0) {
        return { success: false, message: "신고 정보를 찾을 수 없습니다." };
      }
      const { targetType, targetSeq } = targets[0];
      if (targetType === "post") {
        await adminModel.softDeletePost(targetSeq);
      } else if (targetType === "comment") {
        await adminModel.softDeleteComment(targetSeq);
      }
      await adminModel.updateReportStatus(reportSeq, "resolved");
    } else if (action === "dismiss") {
      // 신고 기각: 상태만 변경
      await adminModel.updateReportStatus(reportSeq, "dismissed");
    } else {
      return { success: false, message: "잘못된 처리 유형입니다." };
    }
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 로그 파일 읽기
const getLogContent = async (date, type = "service") => {
  try {
    const logDir = type === "access" ? "logs/access" : "logs/service";
    const fileName = `${date}_${type}.log`;
    const filePath = path.join(process.cwd(), logDir, fileName);

    if (!fs.existsSync(filePath)) {
      return { success: true, content: "해당 날짜의 로그 파일이 없습니다.", fileName };
    }

    const content = fs.readFileSync(filePath, "utf-8");
    // 최신 500줄만 반환
    const lines = content.split("\n");
    const recentLines = lines.slice(Math.max(0, lines.length - 500)).join("\n");
    return { success: true, content: recentLines, fileName };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 신규 가입자 추이
const getSignupStats = async (startDate, endDate) => {
  try {
    const dailySignups = await adminModel.getDailySignups(startDate, endDate);
    return { success: true, dailySignups };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 최근 커뮤니티 활동
const getRecentActivity = async () => {
  try {
    const [recentPosts, recentComments] = await Promise.all([
      adminModel.getRecentPosts(10),
      adminModel.getRecentComments(10),
    ]);
    return { success: true, recentPosts, recentComments };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 사용자 목록
const getUserList = async (page, limit, keyword) => {
  try {
    const [users, totalCount] = await Promise.all([
      adminModel.getUserList(page, limit, keyword),
      adminModel.getUserCount(keyword),
    ]);
    return { success: true, users, totalCount, totalPages: Math.ceil(totalCount / limit) };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 사용자 차단/해제
const toggleUserStatus = async (userSeq, action) => {
  try {
    const useFlag = action === "ban" ? "N" : "Y";
    await adminModel.updateUserStatus(userSeq, useFlag);
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  getVisitStats, getSummaryStats, getReportList, handleReport, getLogContent,
  getSignupStats, getRecentActivity, getUserList, toggleUserStatus,
};
