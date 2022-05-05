import { body, ValidationChain } from 'express-validator';

import { isObjectIdValidator } from '../utils/helper';

export const getDonationsValidationRules: ValidationChain[] = [
  body('campaignId').isString().custom(isObjectIdValidator),
];

export const newDonationValidationRules: ValidationChain[] = [
  body('donor').isObject(),
  body('amount').isNumeric().toFloat(),
  body('isAnonymous').toBoolean(true).optional(),
  body('donor.zip').isString().isLength({ min: 1 }),
  body('donor.state').isString().isLength({ min: 1 }),
  body('donor.contact').isString().isLength({ min: 1 }),
  body('donor.country').isString().isLength({ min: 1 }),
  body('donor.address2').isString().isLength({ min: 1 }),
  body('donor.address1').isString().isLength({ min: 1 }),
  body('donor.lastName').isString().isLength({ min: 1 }),
  body('donor.firstName').isString().isLength({ min: 1 }),
  body('campaignId').isString().custom(isObjectIdValidator),
];

export const sendReceiptToEmailValidationRules: ValidationChain[] = [
  body('id').isString().custom(isObjectIdValidator),
  body('email').isEmail().normalizeEmail(),
];

export const verifyDonationValidationRules: ValidationChain[] = [
  body('id').isString().custom(isObjectIdValidator),
];

export const approveDonationValidationRules: ValidationChain[] = [
  body('id').isString().custom(isObjectIdValidator),
];
