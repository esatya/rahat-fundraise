import express from 'express';

import {
  loginValidationRules,
  newUserValidationRules,
  getByIdValidationRules,
  sendOTPValidationRules,
  verifyOTPValidationRules,
  addWalletValidationRules,
  updateUserValidationRules,
  socialLoginValidationRules,
  getByWalletIdValidationRules,
} from '../validators/User.validation';

import {
  sendOTP,
  addUser,
  userLogin,
  addWallet,
  verifyOTP,
  listUsers,
  getProfile,
  socialLogin,
  getUserById,
  registerUser,
  updateUserById,
  getUsersByWalletId,
} from '../controllers/User.controller';

import { isAuth } from '../middlewares';

const router = express.Router();

// @Route   POST api/user/register
// @desc    Register new user from webapp
// @access  Public
router.post('/register', newUserValidationRules, registerUser);

// @Route   POST api/user/login
// @desc    User Login with Email & OTP
// @access  Public
router.post('/login', loginValidationRules, userLogin);

// @Route   POST api/user/send-otp
// @desc    Send OTP
// @access  Public
router.post('/otp', sendOTPValidationRules, sendOTP);

// @Route   POST api/user/verify-otp
// @desc    Verify OTP
// @access  Public
router.post('/otp/verify', verifyOTPValidationRules, verifyOTP);

// @Route   GET api/user/all
// @desc    List All Users by admin
// @access  Public
router.get('/all', isAuth, listUsers);

// @Route   POST api/user/get-my-profile
// @desc    Get My Profile. Assumes JWT token is passed ---> user lai kam lagni matra : no too much details
// @access  Public
router.get('/get-my-profile', isAuth, getProfile);

// @Route   GET api/user/get-by-id
// @desc    Get User By ID - Google
// @access  Public
router.get('/get-by-id/:id', getByIdValidationRules, getUserById);

// @Route   POST api/user/add
// @desc    Add User by admin
// @access  Public
router.post('/add', isAuth, newUserValidationRules, addUser);

// @Route   POST api/user/update-by-id
// @desc    Update User by Id - logged in user
// @access  Public
router.post('/update-by-id', isAuth, updateUserValidationRules, updateUserById);

// @Route   POST api/user/add-wallet
// @desc    Add Wallet - logged in user
// @access  Public
router.post('/add-wallet', isAuth, addWalletValidationRules, addWallet);

// @Route   POST api/user/social-login
// @desc    Social Login - Google
// @access  Public
router.post('/social-login', socialLoginValidationRules, socialLogin);

// @Route   GET api/user/get-by-walletid
// @desc    Get User By Wallet-ID
// @access  Public
router.get(
  '/get-by-walletid/:walletId',
  getByWalletIdValidationRules,
  getUsersByWalletId,
);

export default router;
