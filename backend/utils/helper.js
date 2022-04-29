const mongoose = require('mongoose');

const convertUserData = (user) => {
  const { updatedDate, createdDate, ...newUser } = user;
  return newUser;
};

const isObjectIdValidator = (value) => {
  if (mongoose.isValidObjectId(value)) {
    return true;
  }
  throw Error('Id is not valid');
};

module.exports = {
  convertUserData,
  isObjectIdValidator,
};
