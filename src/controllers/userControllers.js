const { users, accountType, userRoles } = require("../constants/users");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { account_types } = require("../data/account_types");

// GET - /api/v1/users
exports.getAllUsers = async (req, res) => {
  const [users, metadata] = await sequelize.query(
    `SELECT * FROM user limit 10`
  );

  return res.json(users);
};

// GET - /api/v1/users/:userId
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  const [user, metadata] = await sequelize.query(
    `SELECT user_id, email, name FROM user WHERE user_id = $userId`,
    {
      bind: { userId },
      type: QueryTypes.SELECT,
    }
  );

  if (!user) throw new NotFoundError("That user does not exist");

  return res.json(user);
};

// POST - /api/v1/users
exports.createNewUser = async (req, res) => {
  return res.send("createNewUser has been called.");
};

// PUT - /api/v1/users/:userId
exports.updateUserById = async (req, res) => {
  return res.send("updateUserById has been called.");
};

// DELETE - /api/v1/users/:userId
exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  if (req.user.role == userRoles.ADMIN || req.user.userId == userId) {
    const [user, metadata] = await sequelize.query(
      `DELETE FROM review  WHERE fk_user_id = $userId;
        DELETE FROM user WHERE user_id = $userId;`,
      {
        bind: { userId },
        type: QueryTypes.DELETE,
      }
    );
    if (!user) {
      throw new NotFoundError("The user does not exist");
    }
  } else {
    throw new UnauthorizedError("You are not allowed to delete this user.");
  }
  return res.sendStatus(204);
};
