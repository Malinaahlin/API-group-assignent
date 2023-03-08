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

  if (!review) throw new NotFoundError("This review does not exist");

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
  const reviewId = req.params.reviewId;
  const { content, rating } = req.body;

  if (!content || !rating) {
    throw new BadRequestError("You must enter new values");
  }
  const review = await sequelize.query(
    `
  SELECT * FROM review
  WHERE review_id = $reviewId  
  `,
    {
      bind: { reviewId: reviewId },
      type: QueryTypes.SELECT,
    }
  );

  if (!review) throw new NotFoundError("This review does not exist");

  if (req.user.userId == review[0].fk_user_id) {
    const updatedReview = await sequelize.query(
      `UPDATE review
      SET content= $content, rating = $rating
      WHERE review_id  = $reviewId;`,
      {
        bind: {
          reviewId: reviewId,
          content: content,
          rating: rating,
        },
        type: QueryTypes.UPDATE,
      }
    );
  } else {
    throw new UnauthorizedError("You are not allowed update this review.");
  }

  return res.status(201).json({
    message: "Update succeeded.",
  });
};

// DELETE - /api/v1/reviews/:reviewId
exports.deleteReviewById = async (req, res) => {
  return res.send("deleteReviewById has been called");
};
