import mongoose, { PopulatedDoc } from 'mongoose';

import { ICampaign } from '../../interfaces/models/Campaign';

interface Donor {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  address1: string;
  address2: string;
  contact: string;
  zip: string;
}

export interface IDonation extends mongoose.Document {
  transactionId: string;
  campaignId: PopulatedDoc<ICampaign>;
  donor: Donor;
  isAnonymous: boolean;
  emailReceipt?: string;
  isVerified: boolean;
  amount: number;
}
