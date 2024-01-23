const { ctrlWrapper } = require("../../helpers");

const addResult = require("../historyResult/addResult");
const getResult = require("../historyResult/getResult");

module.exports = {
  addResult: ctrlWrapper(addResult),
  getResult: ctrlWrapper(getResult),
};
