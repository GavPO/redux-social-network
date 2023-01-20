const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  getProfile,
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
  addProfileExperience,
} = require("../../controllers/profileController");

router.route("/me").get(authMiddleware, getProfile);
router.route("/").get(getAllProfiles).post(authMiddleware, createProfile).put(authMiddleware, updateProfile);
router.route('/:userId').get(getProfileById);
router.route('/experience').put(authMiddleware, addProfileExperience)

module.exports = router;
