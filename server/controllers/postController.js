const Post = require('../models/Post')
const User = require('../models/User');
const Profile = require('../models/Profile');

async function getAllPosts(req, res) {
    try {
        const allPosts = await Post.find();

        res.status(200).json(allPosts)
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    }
}

async function createPost(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const postData = {
        text: req.body.text,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id
    };
    const newPost = await Post.create(postData);

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
    getAllPosts,
    createPost,
}