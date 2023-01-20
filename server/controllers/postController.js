const Post = require('../models/Post')
const User = require('../models/User');
const Profile = require('../models/Profile');

async function createPost(req, res) {
  try {
    const user = User.findById(req.user.id);
    const postData = {
        text: req.body.text,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id
    };
    const newPost = Post.create(postData);
    
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
