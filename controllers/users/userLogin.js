const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;
const { REFRESH_SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email or password is wrong");
  }

  const isEqualPasswod = await bcrypt.compare(password, user.password);

  if (!isEqualPasswod) {
    throw HttpError(404, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  await User.findByIdAndUpdate(user._id, { token, refreshToken });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      name: user.name,
      id: user._id,
    },
  });
};

module.exports = login;
