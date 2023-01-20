const User = require("../models/User");
const Profile = require("../models/Profile");
const { signToken } = require("../utils/auth");
const gravatar = require('gravatar');

async function getAllUsers(req, res) {
  try {
      const allUsers = await User.find()
        .select("-__v")
        .select("-password")
      res.status(200).json(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async function getUserById(req, res) {
    try {
      const singleUser = await User.findById(req.user.id)
        .select("-__v")
        .select("-password")
      res.status(200).json(singleUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

async function createUser(req, res) {
    const { username, email, password } = req.body
    try {
      const userCheck = await User.findOne({ email });
      console.log(userCheck)
      if (userCheck) {
        res.status(400).json({ message: "User already exists, please try again" });
        return;
      };
      const avatar = gravatar.url( email, {
        s: '200',
        r: 'pg',
        d: "mm"
      });
      const user = await User.create({username, email, password, avatar});
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    };
  };

  async function loginUser(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).select("-__v");
  
      if (!user) {
        res
          .status(400)
          .json({ message: "Incorrect email or password, please try again" });
        return;
      }
  
      const validPassword = await user.isCorrectPassword(req.body.password);
      console.log(validPassword)
      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect email or password, please try again" });
        return;
      }
  
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async function deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user.id);
      await Profile.findOneAndDelete({ user: req.user.id });
      res.status(200).json(deletedUser)
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
  

  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    deleteUser,
  }