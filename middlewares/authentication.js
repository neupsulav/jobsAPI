const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(500).json({ msg: "Authentization failed" });
    }

    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.secretKey);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = auth;
