import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  bio?: string;
  name?: string;
  email: string;
  phone?: string;
  image?: string;
  alias: string;
  address?: string;
  social?: string[];
  walletId?: string;
  isActive?: boolean;
  emailVerified?: boolean;
  otp?: {
    number: number;
    expiry: number;
  };
  createdDate?: number;
  updatedDate?: number;
}

export default IUser;
