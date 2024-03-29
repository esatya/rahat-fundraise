import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { ICampaign } from '../interfaces/models';
import { CAMPAIGN_OPTIONS } from '../config/constants';

const CampaignModel = new mongoose.Schema<ICampaign>(
  {
    title: { type: String, minLength: 5, required: true },
    excerpt: { type: String, maxLength: 100, default: '' },
    story: String,
    image: String,
    fundRaiser: String,
    wallets: [
      {
        name: String,
        walletAddress: String,
      },
    ],
    target: { type: Number, required: true },
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      required: true,
      enum: CAMPAIGN_OPTIONS,
      default: 'PUBLISHED',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiryDate: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
  },
);

CampaignModel.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

CampaignModel.plugin(uniqueValidator);

export default mongoose.model<ICampaign>('Campaign', CampaignModel);
