const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { REFRESH_SECRET_KEY, SECRET_KEY } = process.env;

const refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.json({ error: HttpError(403) });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

    const user = await User.findById(decoded.id).exec();

    if (!user) {
      res.json({ error: HttpError(401, "User not found") });
    }

    const payload = {
      id: user.id,
    };

    const newAccessToke = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });

    const { token } = await User.findByIdAndUpdate(
      user._id,
      { token: newAccessToke },
      { new: true }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    throw HttpError(401, "Invalid refresh token");
  }
};

module.exports = refreshToken;
