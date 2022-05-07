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
    wallet: { type: String, unique: true },
    bio: { type: String },
    isActive: { type: Boolean, default: false },
    otp: {
      expiry: { type: Number },
      number: { type: Number },
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
