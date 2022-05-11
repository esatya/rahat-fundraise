import mongoose from 'mongoose';
import { IUser } from '../interfaces/models';

export const convertUserData = (user: IUser) => {
  const { updatedDate, createdDate, ...newUser } = user.toJSON();
  return newUser;
};

export const isObjectIdValidator = (value: string) => {
  if (mongoose.isValidObjectId(value)) {
    return true;
  }
  throw Error('Id is not valid');
};

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
