import { body, param, ValidationChain } from 'express-validator';

import { isObjectIdValidator } from '../utils/helper';
import { CAMPAIGN_OPTIONS } from '../config/constants';

export const addNewCampaignValidationRules: ValidationChain[] = [
  body('title').isString().isLength({ min: 5 }),
  body('excerpt').isString().isLength({ max: 100 }),
  body('story').isString().optional(),
  body('fundRaiser').isString().optional(),
  body('wallet').isArray().optional(),
  body('wallet.*.*').isString(),
  body('target').isFloat().toFloat(),
  body('amount').isFloat().toFloat().optional(),
  body('status').isString().toUpperCase().isIn(CAMPAIGN_OPTIONS).optional(),
  body('expiryDate').isISO8601({ strict: true }).isAfter(),
];

export const updateCampaignValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
  body('title').isString().isLength({ min: 5 }).optional(),
  body('excerpt').isString().isLength({ max: 100 }).optional(),
  body('story').isString().optional(),
  body('fundRaiser').isString().optional(),
  body('wallet').isArray().optional(),
  body('wallet.*.*').isString(),
  body('target').isNumeric().toFloat().optional(),
  body('amount').isNumeric().toFloat().optional(),
  body('status').isString().toUpperCase().isIn(CAMPAIGN_OPTIONS).optional(),
];

export const updateCampaignStatusValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
  body('status').isString().toUpperCase().isIn(CAMPAIGN_OPTIONS),
];

export const extendCampaignExpiryDateValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
  body('extendBy').isInt().toInt(),
];

export const removeCampaignValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
];

export const archiveCampaignValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
];

export const updateCampaignAmountValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
  body('amount').isNumeric().toFloat(),
];

export const getCampaignByIdValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
];
