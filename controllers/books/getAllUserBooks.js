const { HttpError } = require("../../helpers");
const { Book } = require("../../models");

const getAllUserBook = async (req, res) => {
  const { _id: user } = req.user;

  if (!user) throw HttpError(404);

  const result = await Book.find({ user });

  if (!result) throw HttpError(403);

  res.json(result);
};

module.exports = getAllUserBook;
