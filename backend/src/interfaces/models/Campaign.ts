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
  image: string;
  fundRaiser?: string;
  wallets?: WalletOptions[];
  target: number;
  amount?: number;
  status: string;
  expiryDate: string;
  creator: PopulatedDoc<IUser>;
}

export default ICampaign;
