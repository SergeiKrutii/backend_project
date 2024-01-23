const { ctrlWrapper } = require("../../helpers");

const addGoal = require("./addGoal");
const getGoal = require("./getGoal");
const achievedGoal = require("./achievedGoal");

module.exports = {
  addGoal: ctrlWrapper(addGoal),
  getGoal: ctrlWrapper(getGoal),
  achievedGoal: ctrlWrapper(achievedGoal),
};
