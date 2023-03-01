const express = require("express");
const router = express.Router();
const {
  getAllCities,
  getCityById,
  createNewCity,
  updateCityById,
  deleteCityById,
} = require("../controllers/cityControllers");

// GET - /api/v1/cities
router.get("/", getAllCities);

// GET - /api/v1/cities/:cityId
router.get("/:cityId", getCityById);

// POST - /api/v1/cities
router.post("/", createNewCity);

// PUT - /api/v1/cities/:cityId
router.put("/:cityId", updateCityById);

// DELETE - /api/v1/cities/:cityId
router.delete("/:cityId", deleteCityById);

module.exports = router;
