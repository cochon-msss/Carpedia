const communityService = require("../services/communityService");
const reportService = require("../services/reportService");
const bookmarkService = require("../services/bookmarkService");
const manufacturerModel = require("../models/manufacturerModel");
const logger = require("../utils/loggerUtil");
const { validatePositiveInt } = require("../utils/validateParam");

const PAGE_SIZE = 10;

// 게시글 목록 페이지 (generationSeq 없으면 차종 선택, 있으면 게시글 목록)
const getPostList = async (req, res) => {
  try {
    const generationSeq = validatePositiveInt(req.query.generationSeq);

    if (!generationSeq) {
      // 차종 선택 페이지: 제조사 목록 서버 렌더
      const manufacturers = await manufacturerModel.getManufacturerList();
      return res.render("community", { mode: "select", manufacturers });
    }

    // 세대 정보 조회
    const generationInfo = await communityService.getGenerationInfo(generationSeq);
    if (!generationInfo) {
      return res.status(404).render("community", { mode: "select", manufacturers: await manufacturerModel.getManufacturerList() });
    }

    const { keyword = "", sort = "latest" } = req.query;
    const currentPage = Math.max(1, validatePositiveInt(req.query.page) || 1);
    const searchKeyword = keyword.trim() || null;
    const sortType = ["latest", "popular", "views"].includes(sort) ? sort : "latest";
    const postList = await communityService.getPostList(generationSeq, currentPage, PAGE_SIZE, searchKeyword, sortType);
    const totalCount = await communityService.getPostCount(generationSeq, searchKeyword);
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    res.render("community", {
      mode: "list",
      postList,
      currentPage,
      totalPages,
      keyword: keyword.trim(),
      sort: sortType,
      generationSeq,
      generationInfo,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 게시글 상세 페이지
const getPostDetail = async (req, res) => {
  try {
    const postSeq = validatePositiveInt(req.params.postSeq);
    if (!postSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const post = await communityService.getPostDetail(postSeq);
    const commentList = await communityService.getCommentList(postSeq);
    const images = await communityService.getPostImages(postSeq);
    const currentUserSeq = req.session.user ? req.session.user.userSeq : null;
    const isAuthor = currentUserSeq && post.userSeq === currentUserSeq;

    let postLiked = false;
    let commentLikeMap = {};
    let bookmarked = false;
    if (currentUserSeq) {
      postLiked = await communityService.getPostLikeInfo(postSeq, currentUserSeq);
      commentLikeMap = await communityService.getCommentLikeMap(postSeq, currentUserSeq);
      bookmarked = await bookmarkService.isBookmarked(postSeq, currentUserSeq);
    }

    res.render("communityDetail", { post, commentList, isAuthor, images, postLiked, commentLikeMap, bookmarked });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 게시글 작성 폼 페이지
const getWriteForm = async (req, res) => {
  try {
    const generationSeq = validatePositiveInt(req.query.generationSeq);
    if (!generationSeq) return res.redirect("/community");

    const generationInfo = await communityService.getGenerationInfo(generationSeq);
    if (!generationInfo) return res.redirect("/community");

    res.render("communityWrite", { editMode: false, post: null, images: [], generationSeq, generationInfo });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 게시글 수정 폼 페이지
const getEditForm = async (req, res) => {
  try {
    const postSeq = validatePositiveInt(req.params.postSeq);
    if (!postSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const post = await communityService.getPostDetail(postSeq);
    const images = await communityService.getPostImages(postSeq);
    const currentUserSeq = req.session.user.userSeq;
    if (post.userSeq !== currentUserSeq) {
      return res.redirect("/communityDetail/" + postSeq);
    }

    const generationSeq = post.generationSeq;
    const generationInfo = generationSeq ? await communityService.getGenerationInfo(generationSeq) : null;

    res.render("communityWrite", { editMode: true, post, images, generationSeq, generationInfo });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 게시글 작성 처리
const createPost = async (req, res) => {
  try {
    const { generationSeq, title, content } = req.body;
    const validGenerationSeq = validatePositiveInt(generationSeq);
    if (!validGenerationSeq) return res.status(400).json({ error: "차종을 선택해주세요." });
    const { userSeq, nickname } = req.session.user;
    const result = await communityService.createPost(validGenerationSeq, title, content, nickname, userSeq);
    if (req.files && req.files.length > 0) {
      await communityService.savePostImages(result.insertId, req.files, 0);
    }
    res.json({ success: true, postSeq: result.insertId });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 게시글 수정 처리
const updatePost = async (req, res) => {
  try {
    const postSeq = validatePositiveInt(req.params.postSeq);
    if (!postSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { title, content } = req.body;
    const { userSeq } = req.session.user;
    const result = await communityService.updatePost(postSeq, title, content, userSeq);
    if (!result.success) {
      return res.status(403).json({ success: false, message: result.message });
    }
    if (req.files && req.files.length > 0) {
      const existingImages = await communityService.getPostImages(postSeq);
      const startOrder = existingImages ? existingImages.length : 0;
      await communityService.savePostImages(postSeq, req.files, startOrder);
    }
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 게시글 삭제 처리
const deletePost = async (req, res) => {
  try {
    const postSeq = validatePositiveInt(req.params.postSeq);
    if (!postSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { userSeq } = req.session.user;
    const result = await communityService.deletePost(postSeq, userSeq);
    if (!result.success) {
      return res.status(403).json({ success: false, message: result.message });
    }
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 댓글 작성 처리
const createComment = async (req, res) => {
  try {
    const postSeq = validatePositiveInt(req.params.postSeq);
    if (!postSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { content, parentCommentSeq } = req.body;
    const { userSeq, nickname } = req.session.user;
    const parent = parentCommentSeq ? validatePositiveInt(parentCommentSeq) : null;
    await communityService.createComment(postSeq, nickname, content, userSeq, parent);
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 댓글 삭제 처리
const deleteComment = async (req, res) => {
  try {
    const commentSeq = validatePositiveInt(req.params.commentSeq);
    if (!commentSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { userSeq } = req.session.user;
    const result = await communityService.deleteComment(commentSeq, userSeq);
    if (!result.success) {
      return res.status(403).json({ success: false, message: result.message });
    }
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 이미지 삭제 처리
const deletePostImage = async (req, res) => {
  try {
    const imageSeq = validatePositiveInt(req.params.imageSeq);
    if (!imageSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { userSeq } = req.session.user;
    const result = await communityService.deletePostImage(imageSeq, userSeq);
    if (!result.success) {
      return res.status(403).json({ success: false, message: result.message });
    }
    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 게시글 좋아요 토글
const togglePostLike = async (req, res) => {
  try {
    const postSeq = validatePositiveInt(req.params.postSeq);
    if (!postSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { userSeq } = req.session.user;
    const result = await communityService.togglePostLike(postSeq, userSeq);
    res.json({ success: true, liked: result.liked, likeCount: result.likeCount });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 댓글 좋아요 토글
const toggleCommentLike = async (req, res) => {
  try {
    const commentSeq = validatePositiveInt(req.params.commentSeq);
    if (!commentSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { userSeq } = req.session.user;
    const result = await communityService.toggleCommentLike(commentSeq, userSeq);
    res.json({ success: true, liked: result.liked, likeCount: result.likeCount });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 북마크 토글
const toggleBookmark = async (req, res) => {
  try {
    const postSeq = validatePositiveInt(req.params.postSeq);
    if (!postSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const { userSeq } = req.session.user;
    const result = await bookmarkService.toggleBookmark(postSeq, userSeq);
    res.json({ success: true, bookmarked: result.bookmarked });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 신고 처리
const createReport = async (req, res) => {
  try {
    const { targetType, targetSeq, reason } = req.body;
    const { userSeq } = req.session.user;
    const validTargetSeq = validatePositiveInt(targetSeq);
    if (!["post", "comment"].includes(targetType) || !validTargetSeq || !reason || !reason.trim()) {
      return res.status(400).json({ success: false, message: "잘못된 요청입니다." });
    }
    const result = await reportService.createReport(targetType, validTargetSeq, userSeq, reason.trim());
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 차종 선택: 모델 목록 JSON API
const getModelsJson = async (req, res) => {
  try {
    const manufacturerSeq = validatePositiveInt(req.params.manufacturerSeq);
    if (!manufacturerSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const models = await manufacturerModel.getModelList(manufacturerSeq);
    res.json(models);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 차종 선택: 세대 목록 JSON API
const getGenerationsJson = async (req, res) => {
  try {
    const modelSeq = validatePositiveInt(req.params.modelSeq);
    if (!modelSeq) return res.status(400).json({ error: "잘못된 요청입니다." });
    const generations = await manufacturerModel.getGenerationList(modelSeq);
    res.json(generations);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPostList,
  getPostDetail,
  getWriteForm,
  getEditForm,
  createPost,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
  deletePostImage,
  togglePostLike,
  toggleCommentLike,
  createReport,
  toggleBookmark,
  getModelsJson,
  getGenerationsJson,
};
