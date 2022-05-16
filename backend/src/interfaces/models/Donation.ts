import mongoose, { PopulatedDoc } from 'mongoose';

import ICampaign from './Campaign';

interface Donor {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  state: string;
  address: string;
  city: string;
  contact: string;
  zip: string;
}

interface IDonation extends mongoose.Document {
  transactionId: string;
  campaignId: PopulatedDoc<ICampaign>;
  walletAddress: string;
  donor?: Donor;
  isAnonymous: boolean;
  emailReceipt?: string;
  isVerified: boolean;
  amount: number;
}

export default IDonation;
