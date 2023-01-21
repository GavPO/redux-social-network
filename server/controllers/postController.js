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
    const user = await User.findById(req.user._id).select("-password");
    const postData = {
      text: req.body.text,
      username: user.username,
      avatar: user.avatar,
      user: req.user._id,
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
    const post = await Post.findById(req.params.postId);
    const userId = post.user.toString();
    console.log(post)
    if (userId !== req.user._id) {
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
    console.log(likedPost)
    if (
      likedPost.likes.filter((like) => like.user.toString() === req.user._id).length > 0
    ) {
      return res.status(400).json({ message: "Post already liked" });
    }

    const postData = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { likes: { user: req.user._id }}},
      { new: true }
    );
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function removeLike(req, res) {
  try {
    const likedPost = await Post.findById(req.params.postId);
    if (
      likedPost.likes.filter((like) => like.user.toString() === req.user._id).length ===
      0
    ) {
      return res.status(400).json({ message: "Post has not yet been liked" });
    }

    const postData = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { likes: { user: req.user._id }}},
      { new: true }
    );
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function addComment(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const commentData = {
      text: req.body.text,
      username: user.username,
      avatar: user.avatar,
      user: req.user._id,
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
        const post = await Post.findById(req.params.postId);
        const comment = post.comments.find(comment => comment.user.toString() === req.user._id)
        if (comment.user.toString() !== req.user._id) {
          return res.status(401).json({ message: "Not authorized" });
        }

    await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { comments: {_id: req.params.commentId }}},
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
