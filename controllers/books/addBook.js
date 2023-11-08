const { Book } = require("../../models/books");

const addBook = async (req, res) => {
  const { _id: user } = req.user;
  const newBook = await Book.create({
    ...req.body,
    user,
  });

  res.status(201).json(newBook);
};

module.exports = addBook;
