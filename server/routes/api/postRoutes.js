const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  createPost,
  getAllPosts,
  deletePost,
  getPostById,
  addLike,
  removeLike,
  addComment,
  deleteComment,
} = require("../../controllers/postController");

router
  .route("/")
  .get(authMiddleware, getAllPosts)
  .post(authMiddleware, createPost);

router
  .route("/:postId")
  .get(authMiddleware, getPostById)
  .delete(authMiddleware, deletePost);

router.route("/like").put(authMiddleware, addLike);
router.route("/unlike").put(authMiddleware, removeLike);

router.route("/comment/:postId").put(authMiddleware, addComment);
router.route("/comment/:postId/:commentId").delete(authMiddleware, deleteComment);

module.exports = router;
