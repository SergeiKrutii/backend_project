const { Book, updateRatingBookSchema } = require("../../models");
const { HttpError } = require("../../helpers");

const updateStatusBook = async (req, res) => {
  const { bookId: _id } = req.params;
  // change book status

  if (req.body.stars === undefined) {
    const bookById = await Book.findByIdAndUpdate(
      _id,
      { isRead: true, status: "Вже прочитано" },
      { new: true }
    );

    if (!bookById) {
      throw HttpError(404, "Not found");
    }

    return res.status(200).json(bookById);
  }

  // update rating for book

  if (req.body.stars !== undefined || req.body.resume !== undefined) {
    const { error } = updateRatingBookSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      { rating: req.body },
      { new: true }
    );

    if (!updatedBook) {
      throw HttpError(404, "Not found");
    }

    return res.status(200).json(updatedBook);
  }
};

module.exports = updateStatusBook;
