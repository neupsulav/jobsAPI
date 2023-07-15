const express = require("express");
const router = express.Router();
const validateWOwner = require("../middlewares/validateOwner");
const authentication = require("../middlewares/authentication");

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

// router.route("/").get(getAllJobs).post(createJob);

router.get("/", authentication, getAllJobs);

router.post("/", authentication, createJob);

// router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

//routes with authentication and validation
router.get("/:id", authentication, validateWOwner, getJob);

router.patch("/:id", authentication, validateWOwner, updateJob);

router.delete("/:id", authentication, validateWOwner, deleteJob);

module.exports = router;
