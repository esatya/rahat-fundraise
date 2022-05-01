import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IDonation } from '../interfaces/models/Donation';

const DonationSchema = new mongoose.Schema<IDonation>(
  {
    transactionId: { type: String, required: true, unique: true },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Campaign',
    },
    donor: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },

      country: { type: String, required: true },
      state: {
        type: String,
        required: true,
      },
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
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
