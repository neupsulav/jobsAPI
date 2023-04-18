const Job = require("../models/jobs");

// get all jobs created by a user
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );

    res.status(200).json({ jobs: jobs, count: jobs.length });
  } catch (error) {
    res.status(500).send(error);
  }
};

// get a single job
const getJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });

    if (!job) {
      res.status(404).send(`No job found with given id ${jobId}`);
    }

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).send(error);
  }
};

// create new job
const createJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;
    const createdBy = req.user.userId;

    const job = await Job.create({ company, position, status, createdBy });
    job.save();

    res.status(201).json({ msg: "New Job created", job });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateJob = async (req, res) => {
  res.status(200).send("Register user");
};

const deleteJob = async (req, res) => {
  res.status(200).send("Register user");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
