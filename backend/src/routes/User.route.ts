import express from 'express';

import {
  loginValidationRules,
  getByIdValidationRules,
  newUserValidationRules,
  addWalletValidationRules,
  updateUserValidationRules,
  socialLoginValidationRules,
  getByWalletIdValidationRules,
} from '../validators/User.validation';

import {
  sendOTP,
  addUser,
  pingUser,
  userLogin,
  addWallet,
  verifyOTP,
  listUsers,
  getProfile,
  socialLogin,
  registerUser,
  updateUserById,
  getUserBySocialId,
  getUsersByWalletId,
} from '../controllers/User.controller';

import { isAuth, tokenExtractor, userExtractor } from '../middlewares';

const router = express.Router();

// @Route   GET api/user
// @desc    Ping user
// @access  Public
router.get('/', pingUser);

// @Route   GET api/user/all
// @desc    List All Users
// @access  Public
router.get('/all', listUsers);

// @Route   POST api/user/add
// @desc    Add User by admin
// @access  Public
router.post('/add', newUserValidationRules, addUser);

// @Route   POST api/user/register
// @desc    Register new user from webapp
// @access  Public
router.post('/register', newUserValidationRules, registerUser);

// @Route   POST api/user/update-by-id
// @desc    Update User by Id
// @access  Public
router.post('/update-by-id', updateUserValidationRules, updateUserById);

// @Route   POST api/user/add-wallet
// @desc    Add Wallet
// @access  Public
router.post('/add-wallet', addWalletValidationRules, userExtractor, addWallet);

// @Route   POST api/user/get-my-profile
// @desc    Get My Profile. Assumes JWT token is passed
// @access  Public
router.get('/get-my-profile', userExtractor, getProfile);

// @Route   POST api/user/login
// @desc    User Login with Email & OTP
// @access  Public
router.post('/login', loginValidationRules, userLogin);

// @Route   POST api/user/social-login
// @desc    Social Login - Google
// @access  Public
router.post('/social-login', socialLoginValidationRules, socialLogin);

// @Route   GET api/user/get-by-id
// @desc    Get User By ID - Google
// @access  Public
router.post('/get-by-id', getByIdValidationRules, getUserBySocialId);

// @Route   GET api/user/get-by-walletid
// @desc    Get User By Wallet-ID
// @access  Public
router.post(
  '/get-by-walletid',
  getByWalletIdValidationRules,
  getUsersByWalletId,
);

// Add phonenumber validation
// not empty
// length --> According to different country

// @Route   POST api/user/send-otp
// @desc    Send OTP
// @access  Public
router.post('/otp/verify', tokenExtractor, verifyOTP);

router.post('/otp', tokenExtractor, sendOTP);

export default router;
