const { User } = require("../../models/users");

const getCurrentUser = async (req, res, next) => {
  const { email, _id, name, haveGoal } = req.user;

  res.status(200).json({
    email,
    _id,
    name,
    haveGoal,
  });
};

module.exports = getCurrentUser;
