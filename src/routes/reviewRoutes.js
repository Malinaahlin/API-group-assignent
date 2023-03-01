const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getReviewById,
  createNewReview,
  updateReviewById,
  deleteReviewById,
} = require("../controllers/reviewControllers");

// GET - /api/v1/reviews
router.get("/", getAllReviews);

// GET - /api/v1/reviews/:reviewId
router.get("/:reviewId", getReviewById);

// POST - /api/v1/reviews/
router.post("/", createNewReview);

// PUT - /api/v1/reviews/:reviewId
router.put("/:reviewId", updateReviewById);

// DELETE - /api/v1/reviews/:reviewId
router.delete("/:reviewId", deleteReviewById);

module.exports = router;
