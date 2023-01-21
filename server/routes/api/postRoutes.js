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

router.route("/like/:postId").put(authMiddleware, addLike);
router.route("/unlike/:postId").put(authMiddleware, removeLike);

router.route("/comment/:postId").put(authMiddleware, addComment);
router
  .route("/comment/:postId/:commentId")
  .delete(authMiddleware, deleteComment);

router
  .route("/:postId")
  .get(authMiddleware, getPostById)
  .delete(authMiddleware, deletePost);

module.exports = router;
