const { Goal } = require("../../models");

const addGoal = async (req, res) => {
  const { _id: user } = req.user;

  const newGoal = await Goal.create({
    ...req.body,
    user,
  });

  res.status(201).json(newGoal);
};

module.exports = addGoal;
