const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { CAMPAIGN_OPTIONS } = require('../config/constants');

const CampaignModel = mongoose.Schema(
  {
    title: { type: String, minLength: 5, required: true },
    excerpt: { type: String, maxLength: 100, required: true },
    story: { type: String },
    fundRaiser: { type: String },
    wallet: { type: Number, required: true },
    target: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: CAMPAIGN_OPTIONS,
      default: 'DRAFT',
    },

    expiryDate: { type: Date, required: true, default: Date.now() },
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
module.exports = mongoose.model('Campaign', CampaignModel);
