const express = require("express");
const router = express.Router();
//const { users } = require("../constants/users");
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/userControllers");
const {
  isAuthenticated,
  authorizeAccountType,
} = require("../middleware/authenticationMiddleware");

// GET - /api/v1/users
router.get("/", isAuthenticated, getAllUsers);

// GET - /api/v1/users/:userId
router.get("/:userId", isAuthenticated, getUserById);

// POST - /api/v1/users
router.post("/", createNewUser);

// PUT - /api/v1/users/:userId
router.put("/:userId", isAuthenticated, updateUserById);

// DELETE - /api/v1/users/:userId
router.delete("/:userId", isAuthenticated, deleteUserById);

module.exports = router;
