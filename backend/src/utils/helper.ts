import mongoose from 'mongoose';

export const convertUserData = (user) => {
  const { updatedDate, createdDate, ...newUser } = user;
  return newUser;
};

export const isObjectIdValidator = (value) => {
  if (mongoose.isValidObjectId(value)) {
    return true;
  }
  throw Error('Id is not valid');
};
