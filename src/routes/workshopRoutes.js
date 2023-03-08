const express = require("express");
const router = express.Router();
const {
  getAllWorkshops,
  getWorkshopById,
  createNewWorkshop,
  updateWorkshopById,
  deleteWorkshopById,
} = require("../controllers/workshopControllers");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authenticationMiddleware");

// GET - /api/v1/workshops
router.get("/", getAllWorkshops);

// GET - /api/v1/workshops/:workshopId
router.get("/:workshopId", getWorkshopById);

// POST - /api/v1/workshops
router.post("/", isAuthenticated, createNewWorkshop);

// PUT - /api/v1/workshops/:workshopId
router.put("/:workshopId", updateWorkshopById);

// DELETE - /api/v1/workshops/:workshopId
router.delete("/:workshopId", deleteWorkshopById);

module.exports = router;
