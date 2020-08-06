const jwt = require("jsonwebtoken");
const { config } = require("../configs/index");
const { GeneralError } = require("../utils/errors");

const generateAccessToken = (data) => {
  try {
    const { id } = data;
    const accessToken = jwt.sign(
      { userId: id, createdAt: Date.now },
      config.JWT_ACCESS_KEY_KEY,
      { expiresIn: config.JWT_EXPIRES }
    );
    return accessToken;
  } catch (error) {
    throw new GeneralError(error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const { id } = data;
    const refreshToken = jwt.sign(
      { userId: id, createdAt: Date.now },
      config.JWT_REFRESH_KEY_KEY
    );
    return refreshToken;
  } catch (error) {
    throw new GeneralError(error);
  }
};

const verifyToken = (givenToken) => {
  try {
    return jwt.verify(givenToken, config.JWT_REFRESH_KEY_KEY, {
      complete: true,
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
