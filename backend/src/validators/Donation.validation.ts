import { body, ValidationChain } from 'express-validator';

import { isObjectIdValidator } from '../utils/helper';

export const getDonationsValidationRules: ValidationChain[] = [
  body('campaignId').isString().custom(isObjectIdValidator),
];

export const newDonationValidationRules: ValidationChain[] = [
  body('donor').isObject(),
  body('amount').isNumeric().toFloat(),
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
