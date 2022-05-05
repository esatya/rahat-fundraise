import { body, ValidationChain } from 'express-validator';

import { isObjectIdValidator } from '../utils/helper';

export const newUserValidationRules: ValidationChain[] = [
  body('name').isString(),
  body('address').isString(),
  body('phone').isString(),
  body('email').isEmail().normalizeEmail(),
  body('emailVerified').toBoolean(true).optional(),
  body('social').isArray().optional(),
  body('social.*').isString(),
  body('image').isString().optional(),
  body('alias').isString(),
  body('wallet').isArray().optional(),
  body('wallet.*').isString(),
  body('bio').isString().optional(),
  body('isActive').toBoolean(true).optional(),
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
  body('wallet').isArray().optional(),
  body('wallet.*').isString(),
  body('bio').isString().optional(),
  body('isActive').toBoolean(true).optional(),
];

export const loginValidationRules = [body('email').exists().isEmail()];

export const addWalletValidationRules: ValidationChain[] = [
  body('wallet').isString(),
];

export const socialLoginValidationRules: ValidationChain[] = [
  body('email').isEmail(),
  body('social').isString(),
];

export const getByIdValidationRules: ValidationChain[] = [
  body('id').exists().isString().custom(isObjectIdValidator),
];

export const getByWalletIdValidationRules: ValidationChain[] = [
  body('walletId').exists().isString(),
];
