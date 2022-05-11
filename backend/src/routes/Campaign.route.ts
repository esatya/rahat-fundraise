import { Router } from 'express';

import { isAuth } from '../middlewares';
import {
  addCampaign,
  getCampaigns,
  removeCampaign,
  getCampaignById,
  updateCampaign,
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
  updateCampaignAmountValidationRules,
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
router.post('/add', isAuth, addNewCampaignValidationRules, addCampaign);

// @Route   POST api/campaign/update
// @desc    List All Campaigns
// @access  Public
router.post(
  '/:campaignId/update',
  isAuth,
  updateCampaignValidationRules,
  updateCampaign,
);

// @Route   POST api/campaign/update-status
// @desc    Update campaigns status
// @access  Public
router.post(
  '/:campaignId/update-status',
  isAuth,
  updateCampaignStatusValidationRules,
  updateCampaignStatus,
);

// @Route   POST api/campaign/extend-expiry-date
// @desc    Extend Campaign Expiry Date
// @access  Public
router.post(
  '/:campaignId/extend-expiry-date',
  isAuth,
  extendCampaignExpiryDateValidationRules,
  extendCampaignExpiryDate,
);

// @Route   POST api/campaign/remove
// @desc    Remove campaign
// @access  Public
router.post(
  '/:campaignId/remove',
  isAuth,
  removeCampaignValidationRules,
  removeCampaign,
);

// @Route   POST api/campaign/archive
// @desc    Archive Campaign
// @access  Public
router.post(
  '/:campaignId/archive',
  isAuth,
  archiveCampaignValidationRules,
  archiveCampaign,
);

// @Route   POST api/campaign/update-amt
// @desc    Update Campaign Amount
// @access  Public
router.post(
  '/:campaignId/update-amt',
  isAuth,
  updateCampaignAmountValidationRules,
  updateCampaignAmount,
);

// @Route   GET api/campaign/get-by-id
// @desc    Get Campaign By ID - Google
// @access  Public
router.get(
  '/get-by-id/:campaignId',
  getCampaignByIdValidationRules,
  getCampaignById,
);

export default router;
