const { Goal, User } = require("../../models");
const { HttpError } = require("../../helpers");

const achievedGoal = async (req, res) => {
  const { goalId: _id } = req.params;
  const { isGoalAchieved, isGoalTimeOut } = req.body;
  const { _id: user } = req.user;

  const goalById = await Goal.findById(_id, { new: true });

  const userById = await User.findById({ _id: user });

  if (!goalById || !userById) {
    throw HttpError(404, "Not found");
  }

  if (isGoalAchieved !== undefined) {
    await goalById.updateOne(
      { isGoalAchieved: true },
      { isTranningBegin: false },
      { new: true }
    );
  }

  if (isGoalTimeOut !== undefined) {
    await goalById.updateOne(
      { isGoalTimeOut: true },
      { isTranningBegin: false },
      { new: true }
    );
  }

  const updatedGoalById = await Goal.findById(_id);

  await userById.updateOne({ haveGoal: false });

  const goalResult = {
    isGoalAchieved: updatedGoalById.isGoalAchieved,
    isGoalTimeOut: updatedGoalById.isGoalTimeOut,
  };

  res.status(202).json(goalResult);
};

module.exports = achievedGoal;
