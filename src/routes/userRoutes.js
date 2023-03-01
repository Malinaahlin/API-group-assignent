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
//const { isAuthenticated, authorizeAccontType } = require('../middleware/authenticationMiddleware')

// GET - /api/v1/users
router.get("/", getAllUsers);

// GET - /api/v1/users/:userId
router.get("/:userId", getUserById);

// POST - /api/v1/users
router.post("/", createNewUser);

// PUT - /api/v1/users/:userId
router.put("/:userId", updateUserById);

// DELETE - /api/v1/users/:userId
router.delete("/:userId", deleteUserById);

module.exports = router;
