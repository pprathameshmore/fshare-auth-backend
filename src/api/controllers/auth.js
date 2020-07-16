const AuthServices = require("../../services/auth");

exports.callbackAuth = async (req, res, next) => {
  const { id, email, username } = req.user.toJSON();
  const { sendToken } = await AuthServices.googleSignIn({ email });
  const userDetail = {
    id,
    email,
    username,
    sendToken,
  };
  io.in(req.session.socketId).emit("user", userDetail);
  res.end();
};
