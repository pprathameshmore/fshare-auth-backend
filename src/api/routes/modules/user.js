const user = require("express").Router();
const { getUserDetailsController } = require("../../controllers/user");

user.route("/").get(getUserDetailsController);

module.exports = user;
