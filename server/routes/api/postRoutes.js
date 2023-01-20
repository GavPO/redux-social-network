const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const { createPost, getAllPosts } = require("../../controllers/postController");

router.route('/').get(authMiddleware, getAllPosts).post(authMiddleware, createPost);

module.exports = router;