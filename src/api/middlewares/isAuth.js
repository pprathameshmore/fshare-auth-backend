const jwt = require("jsonwebtoken");
const { response } = require("../../utils/utils");
const { verifyToken } = require("../../helpers/jwt-token-generate");
const isAuthenticated = async (req, res, next) => {
  try {
    const getToken = req.headers.authorization.split(" ")[1];
    req.user = verifyToken(getToken);
    next();
  } catch (error) {
    return res
      .status(401)
      .json(response(401, "Please Signin to access this route", null));
  }
};

module.exports = {
  isAuthenticated,
};
