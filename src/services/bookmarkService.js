const bookmarkModel = require("../models/bookmarkModel");
const logger = require("../utils/loggerUtil");

// 북마크 토글
const toggleBookmark = async (postSeq, userSeq) => {
  try {
    const existing = await bookmarkModel.checkBookmark(postSeq, userSeq);
    if (existing && existing.length > 0) {
      await bookmarkModel.deleteBookmark(postSeq, userSeq);
      return { bookmarked: false };
    } else {
      await bookmarkModel.createBookmark(postSeq, userSeq);
      return { bookmarked: true };
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// 북마크 여부 조회
const isBookmarked = async (postSeq, userSeq) => {
  try {
    const result = await bookmarkModel.checkBookmark(postSeq, userSeq);
    return result && result.length > 0;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// 북마크 목록 조회
const getBookmarkList = async (userSeq, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    return await bookmarkModel.getBookmarkList(userSeq, offset, pageSize);
  } catch (error) {
    logger.error(error);
  }
};

// 북마크 수 조회
const getBookmarkCount = async (userSeq) => {
  try {
    const result = await bookmarkModel.getBookmarkCount(userSeq);
    return result[0].totalCount;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { toggleBookmark, isBookmarked, getBookmarkList, getBookmarkCount };
