const Job = require("../models/jobs");
const catchAsync = require("./catchAsync");
const ErrorHandler = require("./errorHandler");
const mongoose = require("mongoose");

const validateWOwner = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid job ID", 400));
  }

  const isOwner = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!isOwner) {
    return next(
      new ErrorHandler("User is not authorized to perform this action", 400)
    );
  } else {
    next();
  }
});

module.exports = validateWOwner;
