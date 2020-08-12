const UserServices = require("../../services/user");
const { response } = require("../../utils/utils");
const { GeneralError } = require("../../utils/errors");
const getUserDetailsController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await UserServices.getUserDetails(userId);
    if (!user || user === null)
      return res.status(401).json(response(401, "Unauthorized", null));
    return res.status(200).json(response(200, "User details", user));
  } catch (error) {
    throw new GeneralError(error);
  }
};

module.exports = {
  getUserDetailsController,
};
