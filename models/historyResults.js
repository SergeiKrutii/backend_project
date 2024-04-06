const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const moment = require("moment-timezone");

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
        default: () => {
          const kievTime = moment.tz("Europe/Kiev").format("HH:mm:ss");
          return kievTime;
        },
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
