const { User, schemas } = require("./users");
const { addBookSchema, Book, updateRatingBookSchema } = require("./books");
const { goalsSchema, Goal, addGoalsSchema } = require("./goals");
const { addResultSchema, Result, resultSchema } = require("./historyResults");

module.exports = {
  User,
  Book,
  Goal,
  Result,
  schemas,
  addBookSchema,
  updateRatingBookSchema,
  addResultSchema,
  goalsSchema,
  addGoalsSchema,
  resultSchema,
};
