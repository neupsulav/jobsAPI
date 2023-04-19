const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port;
const noRoute = require("./middlewares/noRoute");
const authRouters = require("./routers/auth");
const jobsRouters = require("./routers/jobs");
const connect = require("./db/connect");
const errorHandlerMiddleware = require("./middlewares/ErrorHandlerMiddleware");

// authentication middleware
const authenticateUser = require("./middlewares/authentication");

//routers
app.use(express.json());
app.use("/api/auth", authRouters);
app.use("/api/jobs", authenticateUser, jobsRouters);

// middlewares
app.use(noRoute);

// error handler middleware
app.use(errorHandlerMiddleware);

const listen = async () => {
  try {
    await connect(process.env.mongoURL);
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

listen();
