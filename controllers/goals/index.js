const { ctrlWrapper } = require("../../helpers");

const addGoal = require("./addGoals");

module.exports = {
  addGoal: ctrlWrapper(addGoal),
};
