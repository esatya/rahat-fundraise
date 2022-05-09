import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { ICampaign } from '../interfaces/models';
import { CAMPAIGN_OPTIONS } from '../config/constants';

const CampaignModel = new mongoose.Schema<ICampaign>(
  {
    title: { type: String, minLength: 5, required: true },
    excerpt: { type: String, maxLength: 100, required: true },
    story: { type: String },
    featured_image: { type: String },
    fundRaiser: { type: String },
    wallet: [
      {
        name: { type: String, required: true },
        walletAddress: { type: String, required: true },
      },
    ],
    target: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: CAMPAIGN_OPTIONS,
      default: 'DRAFT',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expiryDate: { type: Number, required: true, default: Date.now() },
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
