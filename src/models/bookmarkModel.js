const dbHelper = require("../utils/dbHelper");

// 북마크 추가
const createBookmark = async (postSeq, userSeq) => {
  return await dbHelper.query(
    `INSERT INTO bookmarks (post_seq, user_seq) VALUES (?, ?)`,
    [postSeq, userSeq]
  );
};

// 북마크 삭제
const deleteBookmark = async (postSeq, userSeq) => {
  return await dbHelper.query(
    `DELETE FROM bookmarks WHERE post_seq = ? AND user_seq = ?`,
    [postSeq, userSeq]
  );
};

// 북마크 존재 여부
const checkBookmark = async (postSeq, userSeq) => {
  return await dbHelper.query(
    `SELECT bookmark_seq AS bookmarkSeq FROM bookmarks WHERE post_seq = ? AND user_seq = ?`,
    [postSeq, userSeq]
  );
};

// 사용자 북마크 목록 조회
const getBookmarkList = async (userSeq, offset, limit) => {
  return await dbHelper.query(
    `SELECT b.bookmark_seq AS bookmarkSeq,
            b.post_seq AS postSeq,
            b.create_at AS bookmarkedAt,
            p.title,
            p.category,
            p.author,
            p.view_count AS viewCount,
            p.comment_count AS commentCount,
            p.like_count AS likeCount,
            p.create_at AS createAt
       FROM bookmarks b
       JOIN posts p ON b.post_seq = p.post_seq
      WHERE b.user_seq = ? AND p.use_flag = 'Y'
      ORDER BY b.create_at DESC
      LIMIT ? OFFSET ?`,
    [userSeq, limit, offset]
  );
};

// 사용자 북마크 수
const getBookmarkCount = async (userSeq) => {
  return await dbHelper.query(
    `SELECT COUNT(*) AS totalCount
       FROM bookmarks b
       JOIN posts p ON b.post_seq = p.post_seq
      WHERE b.user_seq = ? AND p.use_flag = 'Y'`,
    [userSeq]
  );
};

module.exports = { createBookmark, deleteBookmark, checkBookmark, getBookmarkList, getBookmarkCount };
