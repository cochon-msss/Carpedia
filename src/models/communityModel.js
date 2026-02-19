const dbHelper = require("../utils/dbHelper");

// 게시글 목록 조회
const getPostList = async (category, offset, limit, keyword = null, sortType = "latest") => {
  let sql = `
    SELECT post_seq AS postSeq,
           category,
           title,
           content AS preview,
           author,
           view_count AS viewCount,
           comment_count AS commentCount,
           like_count AS likeCount,
           create_at AS createAt
      FROM posts
     WHERE use_flag = 'Y'`;
  const params = [];

  if (category && category !== "전체") {
    sql += ` AND category = ?`;
    params.push(category);
  }

  if (keyword) {
    sql += ` AND (title LIKE ? OR content LIKE ?)`;
    const likeKeyword = `%${keyword}%`;
    params.push(likeKeyword, likeKeyword);
  }

  switch (sortType) {
    case "popular":
      sql += ` ORDER BY like_count DESC, create_at DESC`;
      break;
    case "views":
      sql += ` ORDER BY view_count DESC, create_at DESC`;
      break;
    default:
      sql += ` ORDER BY create_at DESC`;
  }

  sql += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await dbHelper.query(sql, params);
};

// 게시글 전체 개수
const getPostCount = async (category, keyword = null) => {
  let sql = `SELECT COUNT(*) AS totalCount FROM posts WHERE use_flag = 'Y'`;
  const params = [];

  if (category && category !== "전체") {
    sql += ` AND category = ?`;
    params.push(category);
  }

  if (keyword) {
    sql += ` AND (title LIKE ? OR content LIKE ?)`;
    const likeKeyword = `%${keyword}%`;
    params.push(likeKeyword, likeKeyword);
  }

  return await dbHelper.query(sql, params);
};

// 게시글 상세 조회
const getPostDetail = async (postSeq) => {
  return await dbHelper.query(
    `SELECT post_seq AS postSeq,
            category,
            title,
            content,
            author,
            user_seq AS userSeq,
            view_count AS viewCount,
            comment_count AS commentCount,
            like_count AS likeCount,
            create_at AS createAt
       FROM posts
      WHERE post_seq = ? AND use_flag = 'Y'`,
    [postSeq]
  );
};

// 조회수 증가
const increaseViewCount = async (postSeq) => {
  return await dbHelper.query(
    `UPDATE posts SET view_count = view_count + 1 WHERE post_seq = ?`,
    [postSeq]
  );
};

// 게시글 작성
const createPost = async (category, title, content, author, userSeq) => {
  return await dbHelper.query(
    `INSERT INTO posts (category, title, content, author, user_seq) VALUES (?, ?, ?, ?, ?)`,
    [category, title, content, author, userSeq]
  );
};

// 게시글 수정
const updatePost = async (postSeq, category, title, content) => {
  return await dbHelper.query(
    `UPDATE posts SET category = ?, title = ?, content = ? WHERE post_seq = ? AND use_flag = 'Y'`,
    [category, title, content, postSeq]
  );
};

// 게시글 삭제 (soft delete)
const deletePost = async (postSeq) => {
  return await dbHelper.query(
    `UPDATE posts SET use_flag = 'N' WHERE post_seq = ?`,
    [postSeq]
  );
};

// 댓글 목록 조회
const getCommentList = async (postSeq) => {
  return await dbHelper.query(
    `SELECT comment_seq AS commentSeq,
            post_seq AS postSeq,
            author,
            user_seq AS userSeq,
            content,
            like_count AS likeCount,
            parent_comment_seq AS parentCommentSeq,
            create_at AS createAt
       FROM comments
      WHERE post_seq = ? AND use_flag = 'Y'
      ORDER BY create_at ASC`,
    [postSeq]
  );
};

// 댓글 단건 조회 (권한 확인용)
const getComment = async (commentSeq) => {
  return await dbHelper.query(
    `SELECT comment_seq AS commentSeq, post_seq AS postSeq, user_seq AS userSeq
       FROM comments
      WHERE comment_seq = ? AND use_flag = 'Y'`,
    [commentSeq]
  );
};

// 댓글 작성
const createComment = async (postSeq, author, content, userSeq, parentCommentSeq = null) => {
  return await dbHelper.query(
    `INSERT INTO comments (post_seq, author, content, user_seq, parent_comment_seq) VALUES (?, ?, ?, ?, ?)`,
    [postSeq, author, content, userSeq, parentCommentSeq]
  );
};

// 댓글 삭제 (soft delete)
const deleteComment = async (commentSeq) => {
  return await dbHelper.query(
    `UPDATE comments SET use_flag = 'N' WHERE comment_seq = ?`,
    [commentSeq]
  );
};

// 댓글 수 증가
const increaseCommentCount = async (postSeq) => {
  return await dbHelper.query(
    `UPDATE posts SET comment_count = comment_count + 1 WHERE post_seq = ?`,
    [postSeq]
  );
};

// 이미지 등록
const createPostImage = async (postSeq, fileName, originalName, fileSize, sortOrder) => {
  return await dbHelper.query(
    `INSERT INTO post_images (post_seq, file_name, original_name, file_size, sort_order) VALUES (?, ?, ?, ?, ?)`,
    [postSeq, fileName, originalName, fileSize, sortOrder]
  );
};

// 게시글 이미지 목록 조회
const getPostImages = async (postSeq) => {
  return await dbHelper.query(
    `SELECT image_seq AS imageSeq,
            post_seq AS postSeq,
            file_name AS fileName,
            original_name AS originalName,
            file_size AS fileSize,
            sort_order AS sortOrder
       FROM post_images
      WHERE post_seq = ?
      ORDER BY sort_order ASC`,
    [postSeq]
  );
};

// 이미지 단건 조회
const getPostImage = async (imageSeq) => {
  return await dbHelper.query(
    `SELECT image_seq AS imageSeq,
            post_seq AS postSeq,
            file_name AS fileName
       FROM post_images
      WHERE image_seq = ?`,
    [imageSeq]
  );
};

// 이미지 삭제
const deletePostImage = async (imageSeq) => {
  return await dbHelper.query(
    `DELETE FROM post_images WHERE image_seq = ?`,
    [imageSeq]
  );
};

// 댓글 수 감소
const decreaseCommentCount = async (postSeq) => {
  return await dbHelper.query(
    `UPDATE posts SET comment_count = GREATEST(comment_count - 1, 0) WHERE post_seq = ?`,
    [postSeq]
  );
};

// 게시글 좋아요 존재 여부
const checkPostLike = async (postSeq, userSeq) => {
  return await dbHelper.query(
    `SELECT like_seq AS likeSeq FROM post_likes WHERE post_seq = ? AND user_seq = ?`,
    [postSeq, userSeq]
  );
};

// 게시글 좋아요 추가
const createPostLike = async (postSeq, userSeq) => {
  return await dbHelper.query(
    `INSERT INTO post_likes (post_seq, user_seq) VALUES (?, ?)`,
    [postSeq, userSeq]
  );
};

// 게시글 좋아요 삭제
const deletePostLike = async (postSeq, userSeq) => {
  return await dbHelper.query(
    `DELETE FROM post_likes WHERE post_seq = ? AND user_seq = ?`,
    [postSeq, userSeq]
  );
};

// 게시글 좋아요 수 증가
const increasePostLikeCount = async (postSeq) => {
  return await dbHelper.query(
    `UPDATE posts SET like_count = like_count + 1 WHERE post_seq = ?`,
    [postSeq]
  );
};

// 게시글 좋아요 수 감소
const decreasePostLikeCount = async (postSeq) => {
  return await dbHelper.query(
    `UPDATE posts SET like_count = GREATEST(like_count - 1, 0) WHERE post_seq = ?`,
    [postSeq]
  );
};

// 댓글 좋아요 존재 여부
const checkCommentLike = async (commentSeq, userSeq) => {
  return await dbHelper.query(
    `SELECT like_seq AS likeSeq FROM comment_likes WHERE comment_seq = ? AND user_seq = ?`,
    [commentSeq, userSeq]
  );
};

// 댓글 좋아요 추가
const createCommentLike = async (commentSeq, userSeq) => {
  return await dbHelper.query(
    `INSERT INTO comment_likes (comment_seq, user_seq) VALUES (?, ?)`,
    [commentSeq, userSeq]
  );
};

// 댓글 좋아요 삭제
const deleteCommentLike = async (commentSeq, userSeq) => {
  return await dbHelper.query(
    `DELETE FROM comment_likes WHERE comment_seq = ? AND user_seq = ?`,
    [commentSeq, userSeq]
  );
};

// 댓글 좋아요 수 증가
const increaseCommentLikeCount = async (commentSeq) => {
  return await dbHelper.query(
    `UPDATE comments SET like_count = like_count + 1 WHERE comment_seq = ?`,
    [commentSeq]
  );
};

// 댓글 좋아요 수 감소
const decreaseCommentLikeCount = async (commentSeq) => {
  return await dbHelper.query(
    `UPDATE comments SET like_count = GREATEST(like_count - 1, 0) WHERE comment_seq = ?`,
    [commentSeq]
  );
};

// 게시글의 댓글들에 대한 유저 좋아요 목록
const getCommentLikesByUser = async (postSeq, userSeq) => {
  return await dbHelper.query(
    `SELECT cl.comment_seq AS commentSeq
       FROM comment_likes cl
       JOIN comments c ON cl.comment_seq = c.comment_seq
      WHERE c.post_seq = ? AND cl.user_seq = ? AND c.use_flag = 'Y'`,
    [postSeq, userSeq]
  );
};

// 댓글 좋아요 수 조회
const getCommentLikeCount = async (commentSeq) => {
  return await dbHelper.query(
    `SELECT like_count AS likeCount FROM comments WHERE comment_seq = ?`,
    [commentSeq]
  );
};

module.exports = {
  getPostList,
  getPostCount,
  getPostDetail,
  increaseViewCount,
  createPost,
  updatePost,
  deletePost,
  getCommentList,
  getComment,
  createComment,
  deleteComment,
  increaseCommentCount,
  decreaseCommentCount,
  createPostImage,
  getPostImages,
  getPostImage,
  deletePostImage,
  checkPostLike,
  createPostLike,
  deletePostLike,
  increasePostLikeCount,
  decreasePostLikeCount,
  checkCommentLike,
  createCommentLike,
  deleteCommentLike,
  increaseCommentLikeCount,
  decreaseCommentLikeCount,
  getCommentLikesByUser,
  getCommentLikeCount,
};
