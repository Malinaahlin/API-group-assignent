const jwt = require("jsonwebtoken");
const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors");

exports.isAuthenticated = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  }
  if (!token) {
    throw new UnauthenticatedError("Invalid authentication");
  }
  try {
    const payload = jwt.verify(token, "" + process.env.JWT_SECRET);

    req.user = {
      userId: payload.user_id,
      name: payload.name,
      email: payload.email,
      username: payload.username,
      accountType: payload.fk_account_id,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid authentication");
  }
};

exports.authorizeAccountType = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.roles || !roles.includes(req.user.role)) {
      throw new UnauthenticatedError("No access");
    }
    next();
  };
};
