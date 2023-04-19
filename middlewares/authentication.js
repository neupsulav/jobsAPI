const User = require("../models/user");
const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");
const ErrorHandler = require("./errorHandler");

const auth = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new ErrorHandler("Authentication failed", 500));
  }

  const token = authorization.split(" ")[1];

  const payload = jwt.verify(token, process.env.secretKey);

  req.user = { userId: payload.userId, name: payload.name };
  next();
});

module.exports = auth;
