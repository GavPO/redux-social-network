const { Schema, model, Types } = require("mongoose");
const commentSchema = require("./Comment");

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [commentSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
