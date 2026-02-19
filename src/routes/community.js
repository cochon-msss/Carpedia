const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const { requireLogin, requireLoginApi } = require("../middlewares/authMiddleware");
const {
  getPostList,
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
} = require("../controllers/communityController");

router.get("/", getPostList);
router.get("/write", requireLogin, getWriteForm);
router.get("/:postSeq/edit", requireLogin, getEditForm);
router.post("/write", requireLoginApi, upload.array("images", 20), createPost);
router.put("/:postSeq", requireLoginApi, upload.array("images", 20), updatePost);
router.delete("/:postSeq", requireLoginApi, deletePost);
router.post("/:postSeq/comment", requireLoginApi, createComment);
router.post("/:postSeq/like", requireLoginApi, togglePostLike);
router.post("/comment/:commentSeq/like", requireLoginApi, toggleCommentLike);
router.delete("/comment/:commentSeq", requireLoginApi, deleteComment);
router.delete("/image/:imageSeq", requireLoginApi, deletePostImage);
router.post("/:postSeq/bookmark", requireLoginApi, toggleBookmark);
router.post("/report", requireLoginApi, createReport);

module.exports = router;
