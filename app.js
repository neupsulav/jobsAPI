const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port;
const noRoute = require("./middlewares/noRoute");
const authRouters = require("./routers/auth");
const jobsRouters = require("./routers/jobs");
const connect = require("./db/connect");

// middlewares
app.use(express.json());
app.use(noRoute);

//routers
app.use("/api/auth", authRouters);
app.use("/api/jobs", jobsRouters);

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