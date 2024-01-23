const { Result, Goal } = require("../../models");

const getResult = async (req, res) => {
  const { _id } = req.user;

  const goal = await Goal.find({ user: _id });
  const lastGoal = goal[goal.length - 1];

  const myResult = await Result.findOne({ goal: lastGoal._id });

  res.status(200).json(myResult?.historyResult);
};

module.exports = getResult;
