const User = require("../models/user");

const register = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(500).json({ msg: "Please fill all the fields properly" });
  }

  const newUser = await User.create({ name, password, email });
  newUser.save();

  const token = await newUser.getJWT();

  res.status(200).json({ name: newUser.name, token: token });
};

const login = async (req, res) => {
  res.status(200).send("Login user");
};

module.exports = {
  register,
  login,
};
