import express from 'express';

import {
  addDonation,
  getDonations,
  verifyDonation,
  approveDonation,
  sendReceiptToEmail,
  getDonationsForCampaign,
} from '../controllers/Donation.controller';

import {
  approveDonationValidationRules,
  getDonationsValidationRules,
  newDonationValidationRules,
  sendReceiptToEmailValidationRules,
  verifyDonationValidationRules,
} from '../validators/Donation.validation';

const router = express.Router();

// @Route   GET api/donation
// @desc    All donations
// @access  Public
router.get('/', getDonations);

// @Route   post api/donation/campaign
// @desc    All donations for a campaign
// @access  Public
router.get(
  '/campaign/:campaignId',
  getDonationsValidationRules,
  getDonationsForCampaign,
);

// @Route   POST api/donation/add
// @desc    Add new donation
// @access  Public
router.post('/add', newDonationValidationRules, addDonation);

// @Route   POST api/donation/send-receipt-to-email
// @desc    Send receipt to email
// @access  Public
router.post(
  '/send-receipt-to-email',
  sendReceiptToEmailValidationRules,
  sendReceiptToEmail,
);

// @Route   POST api/donation/verify-donation
// @desc    Verify donation
// @access  Public
router.post('/verify-donation', verifyDonationValidationRules, verifyDonation);

// @Route   POST api/donation/approve-donation
// @desc    Approve donation
// @access  Public
router.post(
  '/approve-donation',
  approveDonationValidationRules,
  approveDonation,
);

export default router;
