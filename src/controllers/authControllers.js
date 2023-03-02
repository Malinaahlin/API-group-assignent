require("dotenv").config();
const { UnauthenticatedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { users, userRoles } = require("../constants/users");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  await sequelize.query(
    "INSERT INTO user (name, email, password) VALUES ($name, $email, $username $password)",
    {
      bind: {
        name: name,
        email: email,
        username: username,
        password: hashedpassword,
      },
    }
  );

  return res.status(201).json({
    message: "Registration succeeded. Please log in.",
  });
};

exports.login = async (req, res) => {
  const { email, password: canditatePassword } = req.body;

  const [user, metadata] = await sequelize.query(
    "SELECT * FROM user WHERE email = $email LIMIT 1;",
    {
      bind: { email },
      type: QueryTypes.SELECT,
    }
  );

  console.log(user);

  if (!user) throw new UnauthenticatedError("Invalid Credentials");

  const isPasswordCorrect = await bcrypt.compare(
    canditatePassword,
    user.password
  );
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Credentials");

  const jwtPayload = {
    userId: user.user_id,
    email: user.email,
    role: user["is_admin"] === 1 ? userRoles.ADMIN : userRoles.USER,
  };

  const jwtToken = jwt.sign(jwtPayload, "" + process.env.JWT_SECRET, {
    expiresIn: "1h" /* 1d */,
  });

  return res.json({ token: jwtToken, user: jwtPayload });
};
