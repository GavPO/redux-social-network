const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  getAllUsers,
  createUser,
  getUserById,
  loginUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(authMiddleware, getAllUsers).post(createUser);
router.route("/:id").get(authMiddleware, getUserById);
router.route("/login").post(loginUser);

// /api/users/:userId
// router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;