const { users, accountType, userRoles } = require("../constants/users");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { account_types } = require("../data/account_types");

// GET - /api/v1/users
exports.getAllUsers = async (req, res) => {
  if (req.user !== userRoles.ADMIN) {
    console.log("test test");
    // throw new UnauthorizedError("Sorry, Unauthorized Access!"); //denna skickar felmedelande 403s
    res.sendStatus(403);
  }
  if (req.user == userRoles.ADMIN) {
    const [users, metadata] = await sequelize.query(`SELECT * FROM user u`);

    return res.json(users);
  }
};

// GET - /api/v1/users/:userId
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  const [user, metadata] = await sequelize.query(
    "SELECT id, email, name FROM user WHERE id = $userId",
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

  if (userId != req.user?.user_Id && req.user.role !== userRoles.ADMIN) {
    throw new UnauthorizedError("Unauthorized Access");
  }

  const [results, metadata] = await sequelize.query(
    "DELETE FROM users WHERE id = $userId RETURNING *",
    {
      bind: { userId },
    }
  );

  if (!results || !results[0])
    throw new NotFoundError("That user does not exist");

  await sequelize.query("DELETE FROM users_lists WHERE fk_usersid = $userId", {
    bind: { userId },
  });

  return res.sendStatus(204);
};
