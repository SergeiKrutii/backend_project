const { Goal } = require("../../models");

const addGoal = async (req, res) => {
  const { _id } = req.user;

  const myGoal = await Goal.find({ user: _id }).populate("updatedBooks").exec();

  res.status(200).json(myGoal[myGoal.length - 1]);
};

module.exports = addGoal;
