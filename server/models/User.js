const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
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

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    console.log(this);
    return await bcrypt.compare(password, this.password);
  };


const User = model("User", userSchema);

module.exports = User;
