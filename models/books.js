const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError, bookDateConfig } = require("../helpers");

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publication_date: {
    type: String,
    required: true,
  },
  amount_page: {
    type: Number,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Вже прочитано", "Читаю", "Маю намір прочитати"],
    default: "Маю намір прочитати",
  },
  rating: {
    stars: { type: String, default: "" },
    resume: { type: String, default: "" },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

booksSchema.post("save", handleMongooseError);

const Book = model("books", booksSchema);

const addBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publication_date: Joi.string()
    .custom((value, helpers) => bookDateConfig(value, helpers))
    .required(),
  amount_page: Joi.string().required(),
});

const updateRatingBookSchema = Joi.object({
  stars: Joi.string().required(),
  resume: Joi.string().required(),
});

module.exports = {
  addBookSchema,
  updateRatingBookSchema,
  Book,
};
