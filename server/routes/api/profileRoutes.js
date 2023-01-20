const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  getProfile,
  createProfile,
  updateProfile,
} = require("../../controllers/profileController");

router.route("/me").get(authMiddleware, getProfile);
router.route("/").post(authMiddleware, createProfile).put(authMiddleware, updateProfile);

module.exports = router;
