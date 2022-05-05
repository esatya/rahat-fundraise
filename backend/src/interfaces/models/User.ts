import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  bio?: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  alias: string;
  address: string;
  social?: string[];
  wallet?: string[];
  isActive: boolean;
  emailVerified: boolean;
}
