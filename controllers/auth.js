const User = require("../models/user");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");

const register = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return next(new ErrorHandler("Please fill all the fields properly", 500));
  }

  const newUser = await User.create({ name, password, email });
  newUser.save();

  const token = await newUser.getJWT();

  res.status(200).json({ name: newUser.name, token: token });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the credentials", 500));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid user credentials", 500));
  }

  //compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid user credentials", 500));
  }

  // generating token
  const token = user.getJWT();

  res.status(200).json({ msg: "User logged in", token: token });
});

module.exports = {
  register,
  login,
};
