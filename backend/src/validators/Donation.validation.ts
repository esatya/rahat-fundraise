import { body, param, ValidationChain } from 'express-validator';

import { isObjectIdValidator } from '../utils/helper';

export const getDonationsValidationRules: ValidationChain[] = [
  param('campaignId').isString().custom(isObjectIdValidator),
];

export const newDonationValidationRules: ValidationChain[] = [
  body('donor').isObject().optional(),
  body('amount').isNumeric().toFloat(),
  body('email').isEmail().normalizeEmail().optional(),
  body('isAnonymous').toBoolean(true).optional(),
  body('donor.*.').isString().isLength({ min: 1 }).optional(),
  body('transactionId').notEmpty().isString(),
  body('campaignId').isString().custom(isObjectIdValidator),
  body('walletAddress').notEmpty().isString(),
];

export const sendReceiptToEmailValidationRules: ValidationChain[] = [
  body('donationId').isString().custom(isObjectIdValidator),
  body('email').isEmail().normalizeEmail(),
];

export const verifyDonationValidationRules: ValidationChain[] = [
  body('id').isString().custom(isObjectIdValidator),
];

export const approveDonationValidationRules: ValidationChain[] = [
  body('id').isString().custom(isObjectIdValidator),
];
