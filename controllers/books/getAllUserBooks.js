const { Book } = require("../../models");

const getAllUserBook = async (req, res) => {
  const { _id: user } = req.user;

  const result = await Book.find({ user });

  res.json(result);
};

module.exports = getAllUserBook;
