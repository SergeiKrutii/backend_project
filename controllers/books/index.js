const { ctrlWrapper } = require("../../helpers");

const addBook = require("./addBook");
const getAllUserBook = require("./getAllUserBooks");
const getBookById = require("./getBookById");
const deleteBook = require("./deleteBook");
const addRatingBook = require("./addRatingBook");
const updateStatusBook = require("./updateStatusBook");

module.exports = {
  addBook: ctrlWrapper(addBook),
  getAllUserBook: ctrlWrapper(getAllUserBook),
  getBookById: ctrlWrapper(getBookById),
  deleteBook: ctrlWrapper(deleteBook),
  addRatingBook: ctrlWrapper(addRatingBook),
  updateStatusBook: ctrlWrapper(updateStatusBook),
};
