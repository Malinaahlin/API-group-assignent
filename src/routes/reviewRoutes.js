const express = require("express");
const router = express.Router();
const {
  getReviewById,
  createNewReview,
  updateReviewById,
  deleteReviewById,
} = require("../controllers/reviewControllers");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authenticationMiddleware");

// GET - /api/v1/reviews/:reviewId
router.get("/:reviewId", getReviewById);

// POST - /api/v1/reviews/
router.post("/", isAuthenticated, createNewReview);

// PUT - /api/v1/reviews/:reviewId
router.put("/:reviewId", isAuthenticated, updateReviewById);

// DELETE - /api/v1/reviews/:reviewId
router.delete("/:reviewId", isAuthenticated, deleteReviewById);

module.exports = router;
