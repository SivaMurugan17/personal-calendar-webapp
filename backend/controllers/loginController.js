const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (!oldUser) {
    res.status(400).send("Email doesn't exist.");
  } else if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ id: oldUser._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ ...oldUser._doc, token });
  } else {
    res.status(400).send("Wrong password.");
  }
};

module.exports = { postLogin };
