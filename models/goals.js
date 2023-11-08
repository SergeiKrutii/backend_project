const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { goalsDateConfig } = require("../helpers");

const { handleMongooseError } = require("../helpers");

const goalsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  startDate: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: "",
  },
});

goalsSchema.post("save", handleMongooseError);

const addGoalsSchema = Joi.object({
  startDate: Joi.string()
    .custom((value, helpers) => goalsDateConfig(value, helpers))
    .required(),
  endDate: Joi.string()
    .custom((value, helpers) => goalsDateConfig(value, helpers))
    .required(),
});

const Goal = model("goals", goalsSchema);

module.exports = {
  goalsSchema,
  addGoalsSchema,
  Goal,
};
