// GET - /api/v1/reviews
exports.getAllReviews = async (req, res) => {
  return res.send("getAllReviews has been called");
};

// GET - /api/v1/reviews/:reviewId
exports.getReviewById = async (req, res) => {
  return res.send("getReviewById has been called");
};

// POST - /api/v1/reviews/
exports.createNewReview = async (req, res) => {
  return res.send("createNewReview has been called");
};

// PUT - /api/v1/reviews/:reviewId
exports.updateReviewById = async (req, res) => {
  return res.send("updateReviewById has been called");
};

// DELETE - /api/v1/reviews/:reviewId
exports.deleteReviewById = async (req, res) => {
  return res.send("deleteReviewById has been called");
};
