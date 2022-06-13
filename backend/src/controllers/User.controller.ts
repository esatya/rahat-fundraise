import jsonwebtoken from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { TUser } from '../types';
import { IUser } from '../interfaces/models';
import { IRequest, IResponse } from '../interfaces/vendors';

import User from '../models/User.model';
import transporter from '../services/mail.service';
import { SITE_KEY, secret, senderEmail, HCAPTCHA_SECRET } from '../config/keys';
import { convertUserData, generateOTP } from '../utils/helper';
import { TOKEN_EXPIRATION_DATE } from '../config/constants';
import axios from 'axios';

const LOGIN_URL = 'https://stage.rahat-fundraise.pages.dev/login';

export const registerUser = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const imageUrl = req.file ? `/uploads/users/${req.file.filename}` : null;

    const email: string = req.body.email;
    const alias: string = req.body.alias;
    let existingUser: TUser = await User.findOne({
      email,
    });
    if (existingUser) {
      throw new Error(
        `This email is already registered. Please sign in with the email address.`,
      );
    }

    existingUser = await User.findOne({
      alias,
    });
    if (existingUser) {
      throw new Error(`Username already taken.`);
    }

    const user: TUser = new User<IUser>({ ...req.body, image: imageUrl });

    const savedUser: IUser = await user.save();

    const message = {
      from: senderEmail,
      to: email,
      subject: 'Welcome to Rahat',

      html: `
        Dear ${alias},
        <br/><br/>
        Thank you for signing up to Rahat Crowdfunding platform. Rahat Crowdfunding platform is an opensource platform which will help you collect fund for the needy people. 
        <br/><br/>
        Please click here to <a href="${LOGIN_URL}" target="_blank">login</a> to your fundraiser account. 
        <br/><br/>
        Thank you. 
        <br/><br/>
        Regrads, 
        Rahat Team `,
    };

    // For testing skip
    if (process.env.NODE_ENV !== 'test') {
      /* istanbul ignore next */
      await transporter.sendMail(message);
    }

    return res.json({
      ok: true,
      msg: 'User Registered Successfully',
      data: convertUserData(savedUser),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const userLogin = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    if (process.env.NODE_ENV !== 'test') {
      /* istanbul ignore next */
      const isPostmanRequest = req.body.isPostmanRequest || false;

      /* istanbul ignore next */
      if (!isPostmanRequest) {
        const captchaResponse = await axios.post(
          'https://hcaptcha.com/siteverify',
          new URLSearchParams({
            response: req.body.captchaToken,
            secret: HCAPTCHA_SECRET,
          }),
        );

        if (!captchaResponse.data || !captchaResponse.data.success) {
          return res.status(400).json({
            ok: false,
            msg: 'Captcha could not be verified. Please try again.',
          });
        }
      }
    }

    const email: string = req.body.email;
    const user: TUser = await User.findOne({ email });

    if (!user) {
      throw new Error(`The email is not registered. Please sign up first.`);
    }

    // Send OTP HERE

    const OTP = generateOTP();

    const message = {
      from: senderEmail,
      to: email,
      subject: 'OTP for Login',
      text: `Your Login OTP is ${OTP}. Do not share it with others.`,
    };

    user.otp = {
      expiry: Date.now() + 5 * 60000,
      number: OTP,
    };

    await user.save({ validateModifiedOnly: true });
    // For testing skip
    if (process.env.NODE_ENV !== 'test') {
      /* istanbul ignore next */
      const mailResult = await transporter.sendMail(message);
    }

    return res.json({
      ok: true,
      msg: 'User Exists',
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const sendOTP = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const email: string = req.body.email;

    const user: TUser = await User.findOne({ email: email });

    if (!user) {
      throw new Error(`User with ${email} not found.`);
    }

    const OTP = generateOTP();

    const message = {
      from: senderEmail,
      to: email,
      subject: 'OTP for Login',
      text: `Your Login OTP is ${OTP}. Do not share it with others.`,
    };

    user.otp = {
      expiry: Date.now() + 5 * 60000,
      number: OTP,
    };

    await user.save({ validateModifiedOnly: true });
    // For testing skip
    if (process.env.NODE_ENV !== 'test') {
      /* istanbul ignore next */
      const mailResult = await transporter.sendMail(message);
    }
    res.json({
      ok: true,
      msg: 'OTP Sent',
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res
      .status(401)
      .json({ ok: false, msg: 'Something went wrong. Please try again.' });
  }
};

export const verifyOTP = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const email: string = req.body.email;
    const otpNumber: number = req.body.otpNumber;

    const user = await User.findOne({ email: email, 'otp.number': otpNumber });

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'User does not exist or OTP is invalid',
      });
    }

    const { number, expiry } = user.otp!;

    if (number !== otpNumber || expiry < Date.now()) {
      throw new Error(`Invalid/Expired OTP.`);
    }

    user.emailVerified = true;
    user.otp = undefined;

    await user.save({ validateModifiedOnly: true });

    const token = jsonwebtoken.sign(
      { id: user?._id, email: user?.email, alias: user?.alias },
      secret,
      { expiresIn: TOKEN_EXPIRATION_DATE },
    );

    res.json({
      ok: true,
      token: token,
      msg: 'OTP Verified',
      isEmailVerified: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res
      .status(401)
      .json({ ok: false, msg: 'Something went wrong. Please try again.' });
  }
};

export const listUsers = async (req: IRequest, res: IResponse) => {
  try {
    const users: IUser[] = await User.find();

    if (!users) {
      throw new Error('Users not found.');
    }

    return res.json({ ok: true, msg: 'User Route Reached', data: users });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const addUser = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email: string = req.body.email;
    const alias: string = req.body.alias;

    // Unique validation
    const userWithEmail: TUser = await User.findOne({
      email: email,
    });

    if (userWithEmail) {
      return res.status(400).json({
        error: 'email already in use',
      });
    }

    const userWithAlias: TUser = await User.findOne({
      alias: alias,
    });

    if (userWithAlias) {
      return res.status(400).json({
        error: 'alias already in use',
      });
    }

    // Add User
    const user: IUser = new User(req.body);

    const savedUser: IUser = await user.save();

    return res.json({ ok: true, msg: 'New User added', data: savedUser });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res
      .status(401)
      .json({ ok: false, msg: 'Something went wrong. Please try again.' });
  }
};

export const updateUserById = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ...updatedData } = req.body;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        error: 'Must have one valid field to update',
      });
    }

    if (req.body.email) {
      let existingUser: TUser = await User.findOne({
        email: req.body.email,
      });
      if (existingUser && existingUser.id !== req.userId) {
        throw new Error(`This email is already registered.`);
      }
    }

    if (req.body.alias) {
      let existingUser = await User.findOne({
        alias: req.body.alias,
      });
      if (existingUser && existingUser.id !== req.userId) {
        throw new Error(`Username already taken.`);
      }
    }

    const imageUrl = req.file ? `/uploads/users/${req.file.filename}` : null;
    const updateQuery = imageUrl
      ? { ...updatedData, image: imageUrl }
      : updatedData;

    const updatedUser: TUser = await User.findByIdAndUpdate(
      req.userId,
      updateQuery,
      {
        runValidators: true,
        new: true,
      },
    );

    if (!updatedUser) {
      return res.status(400).json({
        error: 'User does not exist',
      });
    }

    return res.json({
      ok: true,
      msg: 'User Updated',
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const addWallet = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const user: TUser = await User.findById(req.userId);

    if (!user) {
      throw new Error(`User does not exist.`);
    }

    const walletId: string = req.body.walletId;

    user.walletId = walletId;
    const updatedUser: IUser = await user.save({ validateModifiedOnly: true });

    return res.json({
      ok: true,
      msg: 'Wallet Added',
      data: convertUserData(updatedUser),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const getProfile = async (req: IRequest, res: IResponse) => {
  try {
    const user: TUser = await User.findById(req.userId).populate('campaigns');

    if (!user) {
      throw new Error(`User does not exist.`);
    }

    return res.json({
      ok: true,
      msg: 'User Data',
      data: convertUserData(user),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

// GET user by Id for admin purpose where all the information is visible to admin
export const getUserById = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const { id } = req.params;
    const user: IUser | null = await User.findById(id);

    if (!user) {
      throw new Error(`User not found.`);
    }

    return res.json({
      ok: true,
      msg: 'User Found.',
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }
    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const getUsersByWalletId = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const { walletId } = req.params;

    const user: IUser | null = await User.findOne({ walletId: walletId });

    if (!user) {
      throw new Error(`User with wallet address ${walletId} not found.`);
    }

    return res.json({
      ok: true,
      msg: 'User Found.',
      data: convertUserData(user),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};
