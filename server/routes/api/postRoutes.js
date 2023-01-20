const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  createPost,
  getAllPosts,
  deletePost,
  getPostById,
  addLike,
  removeLike,
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

module.exports = router;
