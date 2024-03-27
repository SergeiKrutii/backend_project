const { Book, updateRatingBookSchema } = require("../../models");
const { HttpError } = require("../../helpers");

const addRatingBook = async (req, res) => {
  const { bookId: _id } = req.params;

  const { error } = updateRatingBookSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  // добавить поля отдельное для добавления review и отдельно для рейтинга
  const updatedBook = await Book.findByIdAndUpdate(
    _id,
    { rating: req.body },
    { new: true }
  );

  if (!updatedBook) {
    throw HttpError(404, "Not found");
  }

  console.log("🚀 ~ updatedBook:", updatedBook);
  res.status(200).json(updatedBook);
};

module.exports = addRatingBook;
