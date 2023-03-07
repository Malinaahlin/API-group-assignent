const express = require("express");
const { userRoles } = require("../constants/users");
const router = express.Router();
const {
  getAllCities,
  getCityById,
  createNewCity,
  updateCityById,
  deleteCityById,
} = require("../controllers/cityControllers");
const { isAuthenticated, authorizeRoles } = require("../middleware/authenticationMiddleware");

// GET - /api/v1/cities
router.get("/", getAllCities);

// GET - /api/v1/cities/:cityId
router.get("/:cityId", getCityById);

// POST - /api/v1/cities
router.post("/", isAuthenticated, authorizeRoles(userRoles.ADMIN), createNewCity);

// PUT - /api/v1/cities/:cityId
router.put("/:cityId", isAuthenticated, authorizeRoles(userRoles.ADMIN), updateCityById);

// DELETE - /api/v1/cities/:cityId
router.delete("/:cityId", isAuthenticated, authorizeRoles(userRoles.ADMIN), deleteCityById);

module.exports = router;
