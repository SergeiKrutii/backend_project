const ctrlWrapper = require("../../helpers/ctrlWrapper");

const register = require("./userRegister");
const login = require("./userLogin");
const logout = require("./userLogout");
const getCurrentUser = require("./userCurrent");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
