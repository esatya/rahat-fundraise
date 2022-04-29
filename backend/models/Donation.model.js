const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const DonationSchema = mongoose.Schema(
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
    emailReciept: { type: String },
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
module.exports = mongoose.model('Donation', DonationSchema);
