import fs from 'fs';
import path from 'path';
import multer from 'multer';
import express from 'express';

import {
  loginValidationRules,
  newUserValidationRules,
  getByIdValidationRules,
  sendOTPValidationRules,
  verifyOTPValidationRules,
  addWalletValidationRules,
  updateUserValidationRules,
  getByWalletIdValidationRules,
  checkUserExistsRules
} from '../validators/User.validation';

import {
  sendOTP,
  addUser,
  userLogin,
  addWallet,
  verifyOTP,
  listUsers,
  getProfile,
  getUserById,
  registerUser,
  updateUserById,
  getUsersByWalletId, checkIfUserExists,
} from '../controllers/User.controller';

import { isAuth, uploadFile } from '../middlewares';

import { IRequest } from '../interfaces/vendors';
import { DestinationCallback, FileNameCallback } from '../interfaces/multer';

const fileStorage = multer.diskStorage({
  destination: (
    req: IRequest,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) => {
    const uploadPath = path.join(__dirname, '../../uploads/users');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },

  filename: (
    req: IRequest,
    file: Express.Multer.File,
    cb: FileNameCallback,
  ) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const router = express.Router();

router.use(uploadFile(fileStorage));

// @Route   POST api/user/register
// @desc    Register new user from webapp
// @access  Public
router.post('/register', newUserValidationRules, registerUser);

// @Route   POST api/user/register
// @desc    Register new user from webapp
// @access  Public
router.post('/checkUserExists', isAuth, checkUserExistsRules, checkIfUserExists); 

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
router.get('/get-by-id/:id', isAuth, getByIdValidationRules, getUserById);

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

// @Route   GET api/user/get-by-walletid
// @desc    Get User By Wallet-ID
// @access  Public
router.get(
  '/get-by-walletid/:walletId',
  getByWalletIdValidationRules,
  getUsersByWalletId,
);

export default router;
