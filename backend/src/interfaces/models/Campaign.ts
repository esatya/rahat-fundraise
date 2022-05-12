import { Document, PopulatedDoc } from 'mongoose';

import IUser from './User';

interface WalletOptions {
  name: string;
  walletAddress: string;
}

interface ICampaign extends Document {
  title: string;
  excerpt: string;
  story?: string;
  featured_image: string;
  fundRaiser?: string;
  wallet: WalletOptions[];
  target: number;
  amount: number;
  status: string;
  expiryDate: string;
  creator: PopulatedDoc<IUser>;
}

export default ICampaign;
