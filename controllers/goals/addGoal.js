const { HttpError } = require("../../helpers");
const { Goal, Book, addGoalsSchema, User, Result } = require("../../models");

const addGoal = async (req, res) => {
  const { booksId, startDate, endDate } = req.body;
  const { _id: user } = req.user;

  const { error } = addGoalsSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  await Book.updateMany({ _id: booksId.map((id) => id) }, { status: "Читаю" });
  await User.updateOne({ _id: user }, { haveGoal: true });

  const updatedBooks = await Book.find({ _id: booksId.map((id) => id) });

  await Goal.create({
    startDate: startDate,
    endDate: endDate,
    updatedBooks: updatedBooks.map((book) => book._id),
    user,
  });

  const goal = await Goal.find({ user: user });

  const lastGoal = goal.length === 0 ? goal[0] : goal[goal?.length - 1];

  await Result.create({
    goal: lastGoal._id,
    historyResult: [],
  });

  const populatedGoal = await Goal.findById({ _id: lastGoal._id })
    .populate("updatedBooks")
    .exec();

  res.status(201).json(populatedGoal);
};

module.exports = addGoal;
