const Container = require("typedi").Container;
const User = require("../models/user");
const { GeneralError } = require("../utils/errors");

class UserServices {
  async checkUser({ condition }) {
    try {
      return await User.findOne({ where: condition });
    } catch (error) {
      throw new GeneralError(error);
    }
  }
  async createUser({ username, email, profilePhoto, token }) {
    try {
      return await User.create({
        username,
        email,
        profilePhoto,
        token,
      });
    } catch (error) {
      throw new GeneralError(error);
    }
  }
  async updateUser({ fields, condition }) {
    const updatedUser = await User.update(fields, { where: condition }).catch(
      (error) => {
        throw new GeneralError(error);
      }
    );
    if (updatedUser[0] === 0 || updatedUser === undefined) {
      return null;
    }
    const user = await User.findOne({ where: condition }).catch((error) =>
      console.log(error)
    );
    return user;
  }

  async getUserDetails(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) return null;
      const {
        id,
        username,
        email,
        premium,
        profilePhoto,
        role,
        createdAt,
      } = user.toJSON();
      console.log(user.toJSON());
      return { id, username, email, premium, profilePhoto, role, createdAt };
    } catch (error) {
      throw new GeneralError(error);
    }
  }
}
module.exports = Container.get(UserServices);
