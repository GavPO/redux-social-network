const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  getProfile,
  createProfile,
} = require("../../controllers/profileController");

router.route("/me").get(authMiddleware, getProfile);
router.route("/").post(createProfile);

module.exports = router;
