const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

async function getAllPosts(req, res) {
  try {
    const allPosts = await Post.find().sort({ date: -1 });

    res.status(200).json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function getPostById(req, res) {
  try {
    const singlePost = await Post.findById(req.params.postId);

    res.status(200).json(singlePost);
  } catch (err) {
    console.error(err);
    res.status(200).json(err);
  }
}

async function createPost(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const postData = {
      text: req.body.text,
      username: user.username,
      avatar: user.avatar,
      user: req.user.id,
    };
    const newPost = await Post.create(postData);

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function deletePost(req, res) {
  try {
    const post = Post.findById(req.params.postId);
    if (post.user._id !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function addLike(req, res) {
  try {
    const likedPost = await Post.findById(req.params.postId);
    if (
      likedPost.likes.filter((like) => like.user._id === req.user.id).length > 0
    ) {
      return res.status(400).json({ message: "Post already liked" });
    }

    await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { likes: req.user.id } },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function removeLike(req, res) {
  try {
    const likedPost = await Post.findById(req.params.postId);
    if (
      likedPost.likes.filter((like) => like.user._id === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ message: "Post has not yet been liked" });
    }

    await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { likes: req.user.id } },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function addComment(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const commentData = {
      text: req.body.text,
      username: user.username,
      avatar: user.avatar,
      user: req.user.id,
    };

    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { comments: commentData } },
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function deleteComment(req, res) {
    try {
        const post = Post.findById(req.params.postId);
        const comment = post.comments.find(comment => comment._id === req.params.commentId)
        if (comment.user._id !== req.user.id) {
          return res.status(401).json({ message: "Not authorized" });
        }

    await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { comments: req.params.commentId } },
        { new: true }
      );
  
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  addLike,
  removeLike,
  addComment,
  deleteComment
};
