const Container = require("typedi").Container;
const User = require("../models/user");
const { GeneralError } = require("../utils/errors");

class UserServices {
  async checkUser({ condition }) {
    try {
      const user = await User.findOne({ where: condition });
      return user;
    } catch (error) {
      throw new GeneralError(error);
    }
  }
  async createUser({ username, email, token }) {
    try {
      return await User.create({
        username,
        email,
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
}
module.exports = Container.get(UserServices);
