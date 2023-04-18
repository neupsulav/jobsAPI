const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res
        .status(500)
        .json({ msg: "Please fill all the fields properly" });
    }

    const newUser = await User.create({ name, password, email });
    newUser.save();

    const token = await newUser.getJWT();

    res.status(200).json({ name: newUser.name, token: token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({ msg: "Please fill all the credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ msg: "Invalid user credentials" });
    }

    //compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(500).json({ msg: "Invalid user credentials" });
    }

    // generating token
    const token = user.getJWT();

    res.status(200).json({ msg: "User logged in", token: token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
