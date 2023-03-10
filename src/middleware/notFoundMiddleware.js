const path = require("path");
const { NotFoundError } = require("../utils/errors");

exports.notFoundMiddleware = (req, res, next) => {
  const isApiPath = req.path && req.path.startsWith("/api/v1/");

  if (isApiPath) {
    throw new NotFoundError("This endpoint does not exist...");
  } else {
    return res
      .status(404)
      .sendFile(path.join(__dirname, "..", "views", "notFound.html"));
  }
};
