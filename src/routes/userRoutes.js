const express = require("express");
const router = express.Router();
const { users } = require("../constants/users");
const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userContollers");
//const { isAuthenticated, authorizeAccontType } = require('../middleware/authenticationMiddleware')

// GET - /api/v1/users

// GET - /api/v1/users/:userId

// POST - /api/v1/users

// PUT - /api/v1/users/:userId

// DELETE - /api/v1/users/:userId

module.exports = router;
