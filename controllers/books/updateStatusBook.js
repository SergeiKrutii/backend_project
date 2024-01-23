const { Book } = require("../../models");
const { HttpError } = require("../../helpers");

const updateStatusBook = async (req, res) => {
  const { bookId: _id } = req.params;

  const bookById = await Book.findByIdAndUpdate(
    _id,
    { isRead: true, status: "Вже прочитано" },
    { new: true }
  );

  if (!bookById) {
    throw HttpError(404, "Not found");
  }

  res.json(bookById);
};

module.exports = updateStatusBook;
