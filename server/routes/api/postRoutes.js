const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const { createPost, getAllPosts, deletePost, getPostById } = require("../../controllers/postController");

router.route('/').get(authMiddleware, getAllPosts).post(authMiddleware, createPost);

router.route('/:postId').get(authMiddleware, getPostById).delete(authMiddleware, deletePost)

module.exports = router;