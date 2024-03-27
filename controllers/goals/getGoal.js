const { Goal } = require("../../models");

const addGoal = async (req, res) => {
  const { _id } = req.user;

  const myGoal = await Goal.find({ user: _id }).populate("updatedBooks").exec();

  const lastGoal = myGoal[myGoal.length - 1];

  res.status(200).json(lastGoal);
};

module.exports = addGoal;
