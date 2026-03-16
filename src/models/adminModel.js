const dbHelper = require("../utils/dbHelper");

// 일별 방문 통계
const getDailyVisits = async (startDate, endDate) => {
  return await dbHelper.query(
    `SELECT DATE(create_at) AS date, COUNT(*) AS count
       FROM visit_logs
      WHERE create_at BETWEEN ? AND ?
      GROUP BY DATE(create_at)
      ORDER BY date`,
    [startDate, endDate]
  );
};

// 시간대별 방문 분포
const getHourlyVisits = async (startDate, endDate) => {
  return await dbHelper.query(
    `SELECT HOUR(create_at) AS hour, COUNT(*) AS count
       FROM visit_logs
      WHERE create_at BETWEEN ? AND ?
      GROUP BY HOUR(create_at)
      ORDER BY hour`,
    [startDate, endDate]
  );
};

// 오늘 방문수
const getTodayVisits = async () => {
  const rows = await dbHelper.query(
    `SELECT COUNT(*) AS count FROM visit_logs WHERE DATE(create_at) = CURDATE()`
  );
  return rows[0].count;
};

// 전체 사용자 수
const getTotalUsers = async () => {
  const rows = await dbHelper.query(
    `SELECT COUNT(*) AS count FROM users WHERE use_flag = 'Y'`
  );
  return rows[0].count;
};

// 전체 게시글 수
const getTotalPosts = async () => {
  const rows = await dbHelper.query(
    `SELECT COUNT(*) AS count FROM posts WHERE use_flag = 'Y'`
  );
  return rows[0].count;
};

// 미처리 신고 수
const getPendingReportCount = async () => {
  const rows = await dbHelper.query(
    `SELECT COUNT(*) AS count FROM reports WHERE status = 'pending'`
  );
  return rows[0].count;
};

// 신고 목록 (게시글/댓글 정보 JOIN)
const getReportList = async () => {
  return await dbHelper.query(
    `SELECT r.report_seq AS reportSeq,
            r.target_type AS targetType,
            r.target_seq AS targetSeq,
            r.reason,
            r.status,
            r.create_at AS createAt,
            r.handled_at AS handledAt,
            u.nick_name AS reporterNickname,
            CASE
              WHEN r.target_type = 'post' THEN p.title
              WHEN r.target_type = 'comment' THEN c.content
            END AS targetContent
       FROM reports r
       JOIN users u ON r.user_seq = u.user_seq
       LEFT JOIN posts p ON r.target_type = 'post' AND r.target_seq = p.post_seq
       LEFT JOIN comments c ON r.target_type = 'comment' AND r.target_seq = c.comment_seq
      ORDER BY FIELD(r.status, 'pending', 'resolved', 'dismissed'), r.create_at DESC`
  );
};

// 신고 상태 변경
const updateReportStatus = async (reportSeq, status) => {
  return await dbHelper.query(
    `UPDATE reports SET status = ?, handled_at = NOW() WHERE report_seq = ?`,
    [status, reportSeq]
  );
};

// 신고 대상 조회 (soft delete용)
const getReportTarget = async (reportSeq) => {
  return await dbHelper.query(
    `SELECT target_type AS targetType, target_seq AS targetSeq FROM reports WHERE report_seq = ?`,
    [reportSeq]
  );
};

// 게시글 soft delete
const softDeletePost = async (postSeq) => {
  return await dbHelper.query(
    `UPDATE posts SET use_flag = 'N' WHERE post_seq = ?`,
    [postSeq]
  );
};

// 댓글 soft delete
const softDeleteComment = async (commentSeq) => {
  return await dbHelper.query(
    `UPDATE comments SET use_flag = 'N' WHERE comment_seq = ?`,
    [commentSeq]
  );
};

// 방문 기록 삽입
const insertVisitLog = async (path, method, userSeq, ipAddress, userAgent) => {
  return await dbHelper.query(
    `INSERT INTO visit_logs (path, method, user_seq, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)`,
    [path, method, userSeq, ipAddress, userAgent]
  );
};

// 일별 신규 가입자 수
const getDailySignups = async (startDate, endDate) => {
  return await dbHelper.query(
    `SELECT DATE(create_at) AS date, COUNT(*) AS count
       FROM users
      WHERE create_at BETWEEN ? AND ?
      GROUP BY DATE(create_at)
      ORDER BY date`,
    [startDate, endDate]
  );
};

// 최근 게시글 활동
const getRecentPosts = async (limit = 10) => {
  return await dbHelper.query(
    `SELECT p.post_seq AS postSeq,
            p.title,
            p.category,
            p.author,
            p.view_count AS viewCount,
            p.comment_count AS commentCount,
            p.like_count AS likeCount,
            p.create_at AS createAt
       FROM posts p
      WHERE p.use_flag = 'Y'
      ORDER BY p.create_at DESC
      LIMIT ?`,
    [limit]
  );
};

// 최근 댓글 활동
const getRecentComments = async (limit = 10) => {
  return await dbHelper.query(
    `SELECT c.comment_seq AS commentSeq,
            c.content,
            c.author,
            c.create_at AS createAt,
            p.post_seq AS postSeq,
            p.title AS postTitle
       FROM comments c
       JOIN posts p ON c.post_seq = p.post_seq
      WHERE c.use_flag = 'Y'
      ORDER BY c.create_at DESC
      LIMIT ?`,
    [limit]
  );
};

// 사용자 목록 (관리자 제외)
const getUserList = async (page, limit, keyword) => {
  let sql = `SELECT user_seq AS userSeq,
                    user_email AS email,
                    nick_name AS nickname,
                    role,
                    create_at AS createAt,
                    use_flag AS useFlag
               FROM users
              WHERE role != 'admin'`;
  const params = [];
  if (keyword) {
    sql += ` AND (user_email LIKE ? OR nick_name LIKE ?)`;
    params.push(`%${keyword}%`, `%${keyword}%`);
  }
  sql += ` ORDER BY create_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, (page - 1) * limit);
  return await dbHelper.query(sql, params);
};

// 사용자 수 (관리자 제외)
const getUserCount = async (keyword) => {
  let sql = `SELECT COUNT(*) AS count FROM users WHERE role != 'admin'`;
  const params = [];
  if (keyword) {
    sql += ` AND (user_email LIKE ? OR nick_name LIKE ?)`;
    params.push(`%${keyword}%`, `%${keyword}%`);
  }
  const rows = await dbHelper.query(sql, params);
  return rows[0].count;
};

// 사용자 차단/해제 (use_flag 토글)
const updateUserStatus = async (userSeq, useFlag) => {
  return await dbHelper.query(
    `UPDATE users SET use_flag = ? WHERE user_seq = ? AND role != 'admin'`,
    [useFlag, userSeq]
  );
};

module.exports = {
  getDailyVisits,
  getHourlyVisits,
  getTodayVisits,
  getTotalUsers,
  getTotalPosts,
  getPendingReportCount,
  getReportList,
  updateReportStatus,
  getReportTarget,
  softDeletePost,
  softDeleteComment,
  insertVisitLog,
  getDailySignups,
  getRecentPosts,
  getRecentComments,
  getUserList,
  getUserCount,
  updateUserStatus,
};
