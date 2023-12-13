const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password, equalPassword } = req.body;
  console.log("🚀 ~ req.body:", req.body);

  if (password !== equalPassword) {
    throw HttpError(409, "Wrong password");
  }
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409);
  }

  const createHashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
};

module.exports = register;
