const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const resultSchema = new Schema({
  goal: {
    type: Schema.Types.ObjectId,
    ref: "goal",
  },
  historyResult: [
    {
      date: {
        type: String,
        default: null,
      },
      time: {
        type: String,
        default: () =>
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
      },
      pageAmount: {
        type: String,
        default: "",
      },
    },
  ],
});

resultSchema.post("save", handleMongooseError);

const addResultSchema = Joi.object({
  date: Joi.string(),
  pageAmount: Joi.string(),
});

const Result = model("result", resultSchema);

module.exports = {
  resultSchema,
  addResultSchema,
  Result,
};
