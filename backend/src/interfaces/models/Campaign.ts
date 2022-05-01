import { Document } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  excerpt: string;
  story?: string;
  fundRaiser?: string;
  wallet: number;
  target: number;
  amount: number;
  status: string;
  expiryDate: number;
}
