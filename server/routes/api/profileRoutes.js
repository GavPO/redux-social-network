const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  getProfile,
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileById,
  addProfileExperience,
  deleteProfileExperience,
  addProfileEducation,
  deleteProfileEducation,
  getGitHubRepos,
} = require("../../controllers/profileController");

router.route("/me").get(authMiddleware, getProfile);
router
  .route("/")
  .get(getAllProfiles)
  .post(authMiddleware, createProfile)
  .put(authMiddleware, updateProfile);
router.route("/:userId").get(getProfileById);

router.route("/experience").put(authMiddleware, addProfileExperience);
router
  .route("/experience/:expId")
  .delete(authMiddleware, deleteProfileExperience);

router.route("/education").put(authMiddleware, addProfileEducation);
router
  .route("/education/:eduId")
  .delete(authMiddleware, deleteProfileEducation);

router.route("/github/:username").get(getGitHubRepos);

module.exports = router;
