const fs = require("fs");
const path = require("path");
const communityModel = require("../models/communityModel");
const notificationService = require("./notificationService");
const logger = require("../utils/loggerUtil");

// 게시글 목록 조회
const getPostList = async (category, page, pageSize, keyword = null, sortType = "latest") => {
  try {
    const offset = (page - 1) * pageSize;
    return await communityModel.getPostList(category, offset, pageSize, keyword, sortType);
  } catch (error) {
    logger.error(error);
  }
};

// 게시글 전체 개수
const getPostCount = async (category, keyword = null) => {
  try {
    const result = await communityModel.getPostCount(category, keyword);
    return result[0].totalCount;
  } catch (error) {
    logger.error(error);
  }
};

// 게시글 상세 조회
const getPostDetail = async (postSeq) => {
  try {
    await communityModel.increaseViewCount(postSeq);
    const post = await communityModel.getPostDetail(postSeq);
    return post[0];
  } catch (error) {
    logger.error(error);
  }
};

// 게시글 작성
const createPost = async (category, title, content, author, userSeq) => {
  try {
    return await communityModel.createPost(category, title, content, author, userSeq);
  } catch (error) {
    logger.error(error);
  }
};

// 게시글 수정
const updatePost = async (postSeq, category, title, content, userSeq) => {
  try {
    const post = await communityModel.getPostDetail(postSeq);
    if (!post || post.length === 0) {
      return { success: false, message: "게시글을 찾을 수 없습니다." };
    }
    if (post[0].userSeq !== userSeq) {
      return { success: false, message: "수정 권한이 없습니다." };
    }
    await communityModel.updatePost(postSeq, category, title, content);
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 게시글 삭제
const deletePost = async (postSeq, userSeq) => {
  try {
    const post = await communityModel.getPostDetail(postSeq);
    if (!post || post.length === 0) {
      return { success: false, message: "게시글을 찾을 수 없습니다." };
    }
    if (post[0].userSeq !== userSeq) {
      return { success: false, message: "삭제 권한이 없습니다." };
    }
    await communityModel.deletePost(postSeq);
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 댓글 목록 조회 (트리 구조 → flat list with depth)
const getCommentList = async (postSeq) => {
  try {
    const comments = await communityModel.getCommentList(postSeq);
    const commentMap = {};
    const roots = [];

    comments.forEach((c) => {
      c.depth = 0;
      c.children = [];
      commentMap[c.commentSeq] = c;
    });

    comments.forEach((c) => {
      if (c.parentCommentSeq && commentMap[c.parentCommentSeq]) {
        commentMap[c.parentCommentSeq].children.push(c);
      } else {
        roots.push(c);
      }
    });

    const result = [];
    const flatten = (list, depth) => {
      list.forEach((c) => {
        c.depth = depth;
        result.push(c);
        flatten(c.children, depth + 1);
      });
    };
    flatten(roots, 0);
    return result;
  } catch (error) {
    logger.error(error);
  }
};

// 댓글 작성
const createComment = async (postSeq, author, content, userSeq, parentCommentSeq = null) => {
  try {
    const result = await communityModel.createComment(postSeq, author, content, userSeq, parentCommentSeq);
    await communityModel.increaseCommentCount(postSeq);

    // 알림: 대댓글이면 부모 댓글 작성자에게 reply 알림
    if (parentCommentSeq) {
      const parentComments = await communityModel.getComment(parentCommentSeq);
      if (parentComments && parentComments.length > 0) {
        await notificationService.createNotification(
          parentComments[0].userSeq, "reply", postSeq,
          author + "님이 회원님의 댓글에 답글을 남겼습니다.", userSeq
        );
      }
    }

    // 알림: 게시글 작성자에게 comment 알림
    const posts = await communityModel.getPostDetail(postSeq);
    if (posts && posts.length > 0) {
      await notificationService.createNotification(
        posts[0].userSeq, "comment", postSeq,
        author + "님이 회원님의 게시글에 댓글을 남겼습니다.", userSeq
      );
    }

    return result;
  } catch (error) {
    logger.error(error);
  }
};

// 댓글 삭제
const deleteComment = async (commentSeq, userSeq) => {
  try {
    const comments = await communityModel.getComment(commentSeq);
    if (!comments || comments.length === 0) {
      return { success: false, message: "댓글을 찾을 수 없습니다." };
    }
    if (comments[0].userSeq !== userSeq) {
      return { success: false, message: "삭제 권한이 없습니다." };
    }
    await communityModel.deleteComment(commentSeq);
    await communityModel.decreaseCommentCount(comments[0].postSeq);
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 이미지 저장
const savePostImages = async (postSeq, files, startOrder = 0) => {
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await communityModel.createPostImage(
        postSeq,
        file.filename,
        file.originalname,
        file.size,
        startOrder + i
      );
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 게시글 이미지 조회
const getPostImages = async (postSeq) => {
  try {
    return await communityModel.getPostImages(postSeq);
  } catch (error) {
    logger.error(error);
  }
};

// 이미지 삭제
const deletePostImage = async (imageSeq, userSeq) => {
  try {
    const images = await communityModel.getPostImage(imageSeq);
    if (!images || images.length === 0) {
      return { success: false, message: "이미지를 찾을 수 없습니다." };
    }
    const image = images[0];
    const post = await communityModel.getPostDetail(image.postSeq);
    if (!post || post.length === 0) {
      return { success: false, message: "게시글을 찾을 수 없습니다." };
    }
    if (post[0].userSeq !== userSeq) {
      return { success: false, message: "삭제 권한이 없습니다." };
    }
    await communityModel.deletePostImage(imageSeq);
    const filePath = path.join(__dirname, "../../public/uploads/community", image.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return { success: true };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 게시글 좋아요 토글
const togglePostLike = async (postSeq, userSeq) => {
  try {
    const existing = await communityModel.checkPostLike(postSeq, userSeq);
    if (existing && existing.length > 0) {
      await communityModel.deletePostLike(postSeq, userSeq);
      await communityModel.decreasePostLikeCount(postSeq);
      const post = await communityModel.getPostDetail(postSeq);
      return { liked: false, likeCount: post[0].likeCount };
    } else {
      await communityModel.createPostLike(postSeq, userSeq);
      await communityModel.increasePostLikeCount(postSeq);
      const post = await communityModel.getPostDetail(postSeq);

      // 알림: 게시글 작성자에게 like 알림
      await notificationService.createNotification(
        post[0].userSeq, "like", postSeq,
        "회원님의 게시글에 좋아요가 눌렸습니다.", userSeq
      );

      return { liked: true, likeCount: post[0].likeCount };
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 댓글 좋아요 토글
const toggleCommentLike = async (commentSeq, userSeq) => {
  try {
    const existing = await communityModel.checkCommentLike(commentSeq, userSeq);
    if (existing && existing.length > 0) {
      await communityModel.deleteCommentLike(commentSeq, userSeq);
      await communityModel.decreaseCommentLikeCount(commentSeq);
      const result = await communityModel.getCommentLikeCount(commentSeq);
      return { liked: false, likeCount: result[0].likeCount };
    } else {
      await communityModel.createCommentLike(commentSeq, userSeq);
      await communityModel.increaseCommentLikeCount(commentSeq);
      const result = await communityModel.getCommentLikeCount(commentSeq);
      return { liked: true, likeCount: result[0].likeCount };
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 게시글 좋아요 여부 조회
const getPostLikeInfo = async (postSeq, userSeq) => {
  try {
    const result = await communityModel.checkPostLike(postSeq, userSeq);
    return result && result.length > 0;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// 댓글 좋아요 Map 조회
const getCommentLikeMap = async (postSeq, userSeq) => {
  try {
    const likes = await communityModel.getCommentLikesByUser(postSeq, userSeq);
    const map = {};
    likes.forEach((like) => {
      map[like.commentSeq] = true;
    });
    return map;
  } catch (error) {
    logger.error(error);
    return {};
  }
};

module.exports = {
  getPostList,
  getPostCount,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
  getCommentList,
  createComment,
  deleteComment,
  savePostImages,
  getPostImages,
  deletePostImage,
  togglePostLike,
  toggleCommentLike,
  getPostLikeInfo,
  getCommentLikeMap,
};
