const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is compulsory"],
  },
  email: {
    type: String,
    required: [true, "Email is compulsory"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

//hashing the user password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// generating jwt
userSchema.methods.getJWT = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.secretKey,
    {
      expiresIn: "30d",
    }
  );

  return token;
};

module.exports = mongoose.model("User", userSchema);
