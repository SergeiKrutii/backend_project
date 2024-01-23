const { Goal, User } = require("../../models");
const { HttpError } = require("../../helpers");

const achievedGoal = async (req, res) => {
  const { goalId: _id } = req.params;
  const { isGoalAchieved, isGoalTimeOut } = req.body;
  const { user } = req.user;

  const goalById = await Goal.findById(_id);

  const userById = await User.findById({ _id: user });

  if (!goalById) {
    throw HttpError(404, "Not found");
  }

  if (isGoalAchieved) {
    await goalById.updateOne({ isGoalAchieved: true }, { new: true });
  }

  if (isGoalTimeOut) {
    await goalById.updateOne(
      { isGoalTimeOut: true },
      // { endDate: "" },
      // { startDate: "" },
      { new: true }
    );
  }

  const goalResult = {
    isGoalAchieved: goalById.isGoalAchieved,
    isGoalTimeOut: goalById.isGoalTimeOut,
  };

  res.status(202).json(goalResult);
};

module.exports = achievedGoal;
