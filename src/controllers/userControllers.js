const { userRoles } = require("../constants/users");
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  UnauthenticatedError,
} = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// GET - /api/v1/users
exports.getAllUsers = async (req, res) => {
  const limit = req.query?.limit || 10;
  const offset = req.query?.offset || 0;

  const [users] = await sequelize.query(
    `SELECT * FROM user ASC LIMIT $limit OFFSET $offset`,
    {
      bind: {
        limit: limit,
        offset: offset,
      },
    }
  );
  return res.json(users);
};

// GET - /api/v1/users/:userId
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  const user = await sequelize.query(
    `SELECT u.user_id, u.name, u.email, u.username AS user, r.content AS review, r.rating, w.name AS workshop
    FROM "user" u 
    LEFT JOIN review r
    ON r.fk_user_id = u.user_id
    WHERE user_id = $userId`,
    {
      bind: { userId: userId },
      type: QueryTypes.SELECT,
    }
  );

  if (!user) throw new NotFoundError("The user does not exist");

  return res.json(user);
};

// PUT - /api/v1/users/:userId
exports.updateUserById = async (req, res) => {
  const userId = req.user.userId;
  const { name, email, username, password } = req.body;

  if (req.user.role == userRoles.ADMIN || req.user.userId == userId) {
    const user = await sequelize.query(
      `SELECT user_id, email, name, username FROM user WHERE user_id = $userId`,
      {
        bind: { userId: userId },
        type: QueryTypes.SELECT,
      }
    );
    if (!user) throw new NotFoundError("The user does not exist");

    if (!name || !email || !username || !password) {
      throw new BadRequestError("You must enter a new value.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const updates = await sequelize.query(
      `UPDATE "user"
      SET name= $name, email= $email, username= $username, password= $password
      WHERE user_id = $userId;`,
      {
        bind: {
          userId: userId,
          name: name,
          email: email,
          username: username,
          password: hashedpassword,
        },
        type: QueryTypes.UPDATE,
      }
    );
  } else {
    throw new UnauthenticatedError("You are not allowed to update this user.");
  }

  return res.status(201).json({
    message: "Update succeeded.",
  });
};

// DELETE - /api/v1/users/:userId
exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  if (req.user.role == userRoles.ADMIN || req.user.userId == userId) {
    await sequelize.query(`DELETE FROM review WHERE fk_user_id = $userId;`, {
      bind: { userId: userId },
      type: QueryTypes.DELETE,
    });

    await sequelize.query(
      `UPDATE workshop SET fk_user_id = 1
      WHERE  fk_user_id = $userId;`,
      {
        bind: { userId: userId },
        type: QueryTypes.UPDATE,
      }
    );

    await sequelize.query(`DELETE FROM user WHERE user_id = $userId;`, {
      bind: { userId: userId },
      type: QueryTypes.DELETE,
    });
  } else {
    throw new UnauthorizedError("You are not allowed to delete this user.");
  }
  return res.status(204).json({
    message: "Review deleted.",
  });
};
