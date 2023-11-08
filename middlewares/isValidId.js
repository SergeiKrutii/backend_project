const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/httpError");

const isValidId = (res, req, next) => {
  const { bookId } = res.params;
  if (!isValidObjectId(bookId)) {
    next(HttpError(400, `${bookId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
