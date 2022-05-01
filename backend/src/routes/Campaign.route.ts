import { Router } from 'express';

import {
  addCampaign,
  getCampaigns,
  removeCampaign,
  getCampaignById,
  updatedCampaign,
  archiveCampaign,
  updateCampaignStatus,
  updateCampaignAmount,
  extendCampaignExpiryDate,
} from '../controllers/Campaign.controller';

import {
  addNewCampaignValidationRules,
  removeCampaignValidationRules,
  updateCampaignValidationRules,
  getCampaignByIdValidationRules,
  archiveCampaignValidationRules,
  updateCampaignStatusValidationRules,
  extendCampaignExpiryDateValidationRules,
} from '../validators/Campaign.validation';

const router = Router();

// @Route   GET api/campaign
// @desc    Ping campaign
// @access  Public
router.get('/', getCampaigns);

// @Route   POST api/campaign/add
// @desc    Add new campaign
// @access  Public
router.post('/add', addNewCampaignValidationRules, addCampaign);

// @Route   POST api/campaign/update
// @desc    List All Campaigns
// @access  Public
router.post('/update', updateCampaignValidationRules, updatedCampaign);

// @Route   POST api/campaign/update-status
// @desc    Update campaigns status
// @access  Public
router.post(
  '/update-status',
  updateCampaignStatusValidationRules,
  updateCampaignStatus,
);

// @Route   POST api/campaign/extend-expiry-date
// @desc    Extend Campaign Expiry Date
// @access  Public
router.post(
  '/extend-expiry-date',
  extendCampaignExpiryDateValidationRules,
  extendCampaignExpiryDate,
);

// @Route   POST api/campaign/remove
// @desc    Remove campaign
// @access  Public
router.post('/remove', removeCampaignValidationRules, removeCampaign);

// @Route   POST api/campaign/archive
// @desc    Archive Campaign
// @access  Public
router.post('/archive', archiveCampaignValidationRules, archiveCampaign);

// @Route   POST api/campaign/update-amt
// @desc    Update Campaign Amount
// @access  Public
router.post(
  '/update-amt',
  updateCampaignStatusValidationRules,
  updateCampaignAmount,
);

// @Route   GET api/campaign/get-by-id
// @desc    Get Campaign By ID - Google
// @access  Public
router.post('/get-by-id', getCampaignByIdValidationRules, getCampaignById);

export default router;
