import { body, param, ValidationChain } from 'express-validator';

import { isObjectIdValidator } from '../utils/helper';

export const newUserValidationRules: ValidationChain[] = [
  body('name').isString().optional(),
  body('address').isString().optional(),
  body('phone').isString().optional(),
  body('email').isEmail().normalizeEmail(),
  body('emailVerified').toBoolean(true).optional(),
  body('social').isArray().optional(),
  body('social.*').isString().optional(),
  body('image').isString().optional(),
  body('alias').isString(),
  body('wallet').isString().optional(),
  body('bio').isString().optional(),
  body('isActive').toBoolean(true).optional(),
  body('isAgency').toBoolean(true).optional(),
];

export const updateUserValidationRules: ValidationChain[] = [
  body('name').isString().optional(),
  body('address').isString().optional(),
  body('phone').isString().optional(),
  body('email').isEmail().normalizeEmail().optional(),
  body('emailVerified').toBoolean(true).optional(),
  body('social').isArray().optional(),
  body('social.*').isString(),
  body('image').isString().optional(),
  body('alias').isString().optional(),
  body('wallet').isString().optional(),
  body('bio').isString().optional(),
  body('isActive').toBoolean(true).optional(),
];

export const loginValidationRules = [
  body('email').exists().isEmail(),
  body('captchaToken').exists().isString(),
];

export const addWalletValidationRules: ValidationChain[] = [
  body('wallet').isString(),
];

export const getByIdValidationRules: ValidationChain[] = [
  param('id').exists().isString().custom(isObjectIdValidator),
];

export const getByWalletIdValidationRules: ValidationChain[] = [
  param('walletId').exists().isString(),
];

export const sendOTPValidationRules: ValidationChain[] = [
  body('email').isEmail().normalizeEmail(),
];

export const verifyOTPValidationRules: ValidationChain[] = [
  body('email').isEmail().normalizeEmail(),
  body('otpNumber').isNumeric().isLength({ min: 6, max: 6 }),
];

export const checkUserExistsRules: ValidationChain[] = [
  body('email').exists().isEmail().normalizeEmail(),
];
