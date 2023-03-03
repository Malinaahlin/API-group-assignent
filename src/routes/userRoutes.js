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
  authorizeRoles,
} = require("../middleware/authenticationMiddleware");

// GET - /api/v1/users
router.get("/", isAuthenticated, authorizeRoles(userRoles.ADMIN), getAllUsers);

// GET - /api/v1/users/:userId
router.get("/:userId", isAuthenticated, getUserById);

// POST - /api/v1/users
router.post("/", createNewUser);

// PUT - /api/v1/users/:userId
router.put("/:userId", isAuthenticated, updateUserById);

// DELETE - /api/v1/users/:userId
router.delete("/:userId", isAuthenticated, deleteUserById);

module.exports = router;
