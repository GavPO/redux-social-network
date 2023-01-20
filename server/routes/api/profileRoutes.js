const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  getProfile
} = require("../../controllers/profileController");

router.route('/me').get(authMiddleware, getProfile);

module.exports = router