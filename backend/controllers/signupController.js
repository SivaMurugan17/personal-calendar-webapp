const User = require("../models/User");
const bcrypt = require("bcryptjs");

const postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    res.status(400).send("User already exists.");
  } else {
    const hashedPassowrd = await bcrypt.hash(password, 10);
    User.create({
      name,
      email,
      password: hashedPassowrd,
    })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((error) => res.status(400).json(error));
  }
};

module.exports = { postSignup };
