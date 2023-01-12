const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const User = model("User", userSchema);

module.exports = User;
