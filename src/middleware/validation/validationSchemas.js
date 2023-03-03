const { body } = require("express-validator");

exports.registerSchema = [
  body("name")
    .not()
    .isEmpty()
    .isLength({ min: 1 })
    .withMessage("You must provide a name that is at least 1 characters long"),

  body("email").isEmail().withMessage("You must provide a valid email address"),

  body("username")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage(
      "You must provide a username that is at least 3 characters long"
    ),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage(
      "You must provide a password that is at least 6 characters long"
    ),
];

exports.loginSchema = [
  body("email").isEmail().withMessage("You must provide a email"),
  body("password").not().isEmpty().withMessage("You must provide a password"),
];
