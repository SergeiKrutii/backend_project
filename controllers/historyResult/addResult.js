const { HttpError } = require("../../helpers");
const { addResultSchema, Result, Goal } = require("../../models");

const addResult = async (req, res) => {
  const { date, pageAmount } = req.body;
  const { _id } = req.user;

  const { error } = addResultSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const goal = await Goal.find({ user: _id });
  const lastGoal = goal.length === 0 ? 0 : goal[goal.length - 1];

  const result = await Result.findOneAndUpdate(
    { goal: lastGoal._id },
    { $push: { historyResult: { date: date, pageAmount: pageAmount } } },
    { new: true }
  );

  res.status(201).json(result?.historyResult);
};

module.exports = addResult;
