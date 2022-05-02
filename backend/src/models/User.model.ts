import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IUser } from '../interfaces/models/User';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: true, default: false },
    social: [{ type: String }],
    image: { type: String },
    alias: { type: String, unique: true },
    wallet: [{ type: String }],
    bio: { type: String },
    isActive: { type: Boolean, default: false },
    otp: {
      number: { type: Number, required: true },
      expiry: { type: Number, required: true },
      phoneNumber: { type: Number, required: true },
    },
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
  },
);

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', UserSchema);
