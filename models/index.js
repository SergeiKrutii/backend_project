const { User, schemas } = require("./users");
const { addBookSchema, Book, updateRatingBookSchema } = require("./books");
const { goalsSchema, Goal, addGoalsSchema } = require("./goals");

module.exports = {
  User,
  Book,
  Goal,
  schemas,
  addBookSchema,
  updateRatingBookSchema,
  goalsSchema,
  addGoalsSchema,
};
