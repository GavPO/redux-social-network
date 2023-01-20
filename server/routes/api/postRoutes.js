const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const { createPost, getAllPosts, deletePost } = require("../../controllers/postController");

router.route('/').get(authMiddleware, getAllPosts).post(authMiddleware, createPost);

router.route('/:postId').delete(deletePost)

module.exports = router;