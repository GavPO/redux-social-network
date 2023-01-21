const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema({
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
      date: {
        type: Date,
        default: Date.now,
      },
});

module.exports = commentSchema