import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IDonation } from '../interfaces/models';

const DonationSchema = new mongoose.Schema<IDonation>(
  {
    transactionId: { type: String, required: true, unique: true },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Campaign',
    },
    walletAddress: { type: String, required: true },
    donor: {
      fullName: String,
      email: String,
      country: String,
    },
    isAnonymous: { type: Boolean, required: true, default: false },
    emailReceipt: { type: String },
    isVerified: { type: Boolean, required: true, default: false },
    amount: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
  },
);

DonationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

DonationSchema.plugin(uniqueValidator);

export default mongoose.model<IDonation>('Donation', DonationSchema);
