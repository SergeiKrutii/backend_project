const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const goalsSchema = new Schema({
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  isGoalAchieved: {
    type: Boolean,
    default: false,
  },
  isGoalTimeOut: {
    type: Boolean,
    default: false,
  },
  isTraningBegin: {
    type: Boolean,
    default: false,
  },
  updatedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "books",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

goalsSchema.post("save", handleMongooseError);

const addGoalsSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  booksId: Joi.array(),
});

const Goal = model("goals", goalsSchema);

module.exports = {
  goalsSchema,
  addGoalsSchema,
  Goal,
};
