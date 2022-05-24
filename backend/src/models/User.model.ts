import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IUser } from '../interfaces/models';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    address: String,
    phone: String,
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: true, default: false },
    social: [{ type: String }],
    image: String,
    alias: { type: String, unique: true },
    walletId: String,
    bio: String,
    isActive: { type: Boolean, default: false },
    otp: {
      expiry: { type: Number },
      number: { type: Number },
    },
    campaigns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
      },
    ],
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
    delete returnedObject.updatedDate;
  },
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', UserSchema);
