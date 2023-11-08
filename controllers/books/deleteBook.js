const { Book } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const result = await Book.findByIdAndRemove(bookId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Book deleted",
  });
};

module.exports = deleteBook;
