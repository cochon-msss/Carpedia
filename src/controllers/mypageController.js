const bookmarkService = require("../services/bookmarkService");
const logger = require("../utils/loggerUtil");

const PAGE_SIZE = 10;

// 마이페이지 렌더링
const getMypage = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const currentPage = parseInt(page);
    const { userSeq } = req.session.user;
    const bookmarkList = await bookmarkService.getBookmarkList(userSeq, currentPage, PAGE_SIZE);
    const totalCount = await bookmarkService.getBookmarkCount(userSeq);
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    res.render("mypage", { bookmarkList, currentPage, totalPages });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getMypage };
