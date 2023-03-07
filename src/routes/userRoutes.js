const express = require("express");
const router = express.Router();
const { userRoles } = require("../constants/users");
const {validate} = require("../middleware/validation/validationMiddleware")
const {registerSchema} = require("../middleware/validation/validationSchemas")

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
router.post("/", validate(registerSchema), createNewUser);

// PUT - /api/v1/users/:userId
router.put("/:userId", isAuthenticated, updateUserById);

// DELETE - /api/v1/users/:userId
router.delete("/:userId", isAuthenticated, deleteUserById);

module.exports = router;
