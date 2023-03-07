const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");

// GET - /api/v1/reviews/:reviewId
exports.getReviewById = async (req, res) => {
  const reviewId = req.params.reviewId;

  const [review] = await sequelize.query(
    `SELECT u.username, r.content AS review, r.rating, w.name AS workshop
    FROM review r
    LEFT JOIN "user" u
    ON u.user_id  = r.fk_user_id
    LEFT JOIN workshop w
    ON r.fk_workshop_id = w.workshop_id
    WHERE r.review_id  = $reviewId;`,
    {
      bind: { reviewId: reviewId },
      type: QueryTypes.SELECT,
    }
  );

  if (!review) throw new NotFoundError("That review does not exist");

  return res.json(review);
};

// POST - /api/v1/reviews/
exports.createNewReview = async (req, res) => {
  const { content, rating, workshopId } = req.body;
  const userId = req.user.userId;

  if (!content || !rating || !workshopId) {
    throw new BadRequestError("You must fill in all fields! ");
  }
  const newReview = await sequelize.query(
    `
      INSERT INTO review (content, rating, fk_workshop_id, fk_user_id)
      VALUES ($content, $rating, $workshopId, $userId);
    `,
    {
      bind: {
        content: content,
        rating: rating,
        workshopId: workshopId,
        userId: userId,
      },
      type: QueryTypes.INSERT,
    }
  );
  return res.status(201).json({
    message: "Review created.",
  });
};

// PUT - /api/v1/reviews/:reviewId
exports.updateReviewById = async (req, res) => {
  return res.send("updateReviewById has been called");
};

// DELETE - /api/v1/reviews/:reviewId
exports.deleteReviewById = async (req, res) => {
  return res.send("deleteReviewById has been called");
};
