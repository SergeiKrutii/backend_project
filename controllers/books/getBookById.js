const { Book } = require("../../models");
const { HttpError } = require("../../helpers");

const getBookById = async (req, res) => {
  const { bookId: _id } = req.params;
  const bookById = await Book.findById(_id);

  if (!bookById) {
    throw HttpError(404, "Not found");
  }
  res.json(bookById);
};

module.exports = getBookById;
