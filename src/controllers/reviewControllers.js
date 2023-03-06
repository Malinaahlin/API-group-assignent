const { users, accountType, userRoles } = require("../constants/users");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { account_types } = require("../data/account_types");

// GET - /api/v1/reviews
//REMOVE THIS, NOT NEEDED
exports.getAllReviews = async (req, res) => {
  const [review, metadata] = await sequelize.query(`
  SELECT * FROM review 
  `);

  return res.json(review);
};

// GET - /api/v1/reviews/:reviewId
exports.getReviewById = async (req, res) => {
  //return res.send("getReviewById has been called");
  const reviewId = req.params.reviewId;

  const [review, metadata] = await sequelize.query(
    `SELECT * 
    FROM review 
    WHERE review_id = $reviewId;`,
    {
      bind: { reviewId },
      type: QueryTypes.SELECT,
    }
  );

  if (!review) throw new NotFoundError("That review does not exist");

  return res.json(review);
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
