const UserServices = require("../../services/user");
const { response } = require("../../utils/utils");
const User = require("../../models/user");
const {
  generateAccessToken,
  verifyToken,
} = require("../../helpers/jwt-token-generate");
const { GeneralError } = require("../../utils/errors");

const callbackAuth = async (req, res, next) => {
  try {
    const { id, email, username, refreshToken } = req.user;
    const accessToken = generateAccessToken({ id, email });
    const userDetails = {
      id,
      email,
      username,
      refreshToken,
      accessToken,
    };
    io.in(req.session.socketId).emit("user", userDetails);
  } catch (error) {
    console.log(error);
  }
};

const signout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res
        .status(400)
        .json(response(400, "Refresh Token required", null));
    const fields = { refreshToken: null };
    const condition = { refreshToken: refreshToken };
    const user = await User.update(fields, { where: condition });
    console.log(user);
    if (user[0] === 0)
      return res
        .status(403)
        .json(response(403, "User may already Sign out or token wrong", null));
    if (user)
      return res.status(200).json(response(200, "Sign out successful", null));
  } catch (error) {
    console.log(error);
  }
};

const sendAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res
        .status(400)
        .json(response(400, "Refresh token required", null));

    //Check token in database
    const condition = { refreshToken };
    const user = await UserServices.checkUser({ condition }).catch((error) =>
      console.error(error)
    );
    if (!user) return res.status(401).json(response(401, "Unauthorized", null));
    //Verify JWT
    const isValidToken = verifyToken(refreshToken);
    if (!isValidToken)
      return res.status(401).json(response(401, "Unauthorized", null));

    const accessToken = generateAccessToken({ id: user.toJSON().id });
    return res
      .status(200)
      .json(response(200, "Access token generated", accessToken));
  } catch (error) {
    throw new GeneralError(error);
  }
};

module.exports = {
  signout,
  callbackAuth,
  sendAccessToken,
};
