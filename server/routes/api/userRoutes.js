const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  getAllUsers,
  createUser,
  getUserById,
  loginUser,
  deleteUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(authMiddleware, getAllUsers).post(createUser).delete(authMiddleware, deleteUser);
router.route("/:id").get(authMiddleware, getUserById);
router.route("/login").post(loginUser);


module.exports = router;
