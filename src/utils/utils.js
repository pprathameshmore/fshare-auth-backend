const { GeneralError } = require("./errors");

exports.response = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data,
  };
};

exports.isDefVar = (variable) => (variable ? true : false);

exports.isDefObject = (object) =>
  Object.keys(object).length === 0 ? false : true;
