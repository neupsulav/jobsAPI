const register = async (req, res) => {
  res.status(200).send("Register user");
};

const login = async (req, res) => {
  res.status(200).send("Login user");
};

module.exports = {
  register,
  login,
};
