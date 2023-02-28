const express = require("express")
const router = express.Router()
const { users } = require("../constants/users")
const { getAllUsers, getUserById, deleteUserById } = require("../controllers/userContollers")
//const { isAuthenticated, authorizeAccontType } = require('../middleware/authenticationMiddleware')

