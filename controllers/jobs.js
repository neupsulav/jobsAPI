const Job = require("../models/jobs");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");

// get all jobs created by a user
const getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  res.status(200).json({ jobs: jobs, count: jobs.length });
});

// get a single job
const getJob = catchAsync(async (req, res, next) => {
  const jobId = req.params.id;
  const userId = req.user.userId;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    return next(new ErrorHandler(`No job found with given id ${jobId}`, 404));
  }

  res.status(200).json({ job });
});

// create new job
const createJob = catchAsync(async (req, res, next) => {
  const { company, position, status } = req.body;
  const createdBy = req.user.userId;

  const job = await Job.create({ company, position, status, createdBy });
  job.save();

  res.status(201).json({ msg: "New Job created", job });
});

// update job
const updateJob = catchAsync(async (req, res, next) => {
  const createdBy = req.user.userId;
  const jobId = req.params.id;

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: createdBy },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    return next(new ErrorHandler("No job found ", 404));
  }

  res.status(200).json({ job });
});

// delete job
const deleteJob = catchAsync(async (req, res, next) => {
  const jobId = req.params.id;
  const createdBy = req.user.userId;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: createdBy,
  });

  if (!job) {
    return next(new ErrorHandler(`No job found with given id ${jobId}`, 404));
  }

  res.status(200).json({ msg: "the following job is removed", job });
});

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
