import jsonwebtoken from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { IUser } from '../interfaces/models/User';
import { IRequest, IResponse } from '../interfaces/vendors';

import User from '../models/User.model';
import transporter from '../services/mail.service';
import { secret, senderEmail } from '../config/keys';
import { convertUserData, generateOTP } from '../utils/helper';

export const registerUser = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const imageUrl = req.file ? `/images/users/${req.file.filename}` : null;

    const user: IUser = new User<IUser>({ ...req.body, image: imageUrl });

    const savedUser: IUser = await user.save();

    return res.json({
      ok: true,
      msg: 'User Registered Successfully',
      data: convertUserData(savedUser?.toJSON()),
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

    const email: string = req.body.email;
    const user: IUser = await User.findOne({ email });

    if (!user) {
      throw new Error(`User with ${email} not found.`);
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

    const user: IUser = await User.findOne({ email: email });

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

    user.otp.number = OTP;
    user.otp.expiry = Date.now() + 5 * 60000;

    await user.save({ validateModifiedOnly: true });

    await transporter.sendMail(message);

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

    const { number, expiry } = user.otp;

    if (number !== otpNumber || expiry < Date.now()) {
      throw new Error(`Invalid/Expired OTP.`);
    }

    user.emailVerified = true;
    user.otp = undefined;

    await user.save({ validateModifiedOnly: true });

    const token = jsonwebtoken.sign(
      { id: user?._id, email: user?.email, alias: user?.alias },
      secret,
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
    const userWithEmail: IUser = await User.findOne({
      email: email,
    });

    if (userWithEmail) {
      return res.status(400).json({
        error: 'email already in use',
      });
    }

    const userWithAlias: IUser = await User.findOne({
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

    const updatedUser: IUser = await User.findByIdAndUpdate(
      req.userId,
      updatedData,
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

    const user: IUser = await User.findById(req.userId);

    if (!user) {
      throw new Error(`User does not exist.`);
    }

    const wallet: string = req.body.wallet;

    user.wallet = wallet;
    const updatedUser: IUser = await user.save({ validateModifiedOnly: true });

    return res.json({
      ok: true,
      msg: 'Wallet Added',
      data: convertUserData(updatedUser?.toJSON()),
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
    const user: IUser = await User.findById(req.userId);

    return res.json({
      ok: true,
      msg: 'Login Successful',
      data: convertUserData(user.toJSON()),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const socialLogin = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const { email, social } = req.body;
    const user: IUser = await User.findOne({
      email,
      social: { $in: [social] },
    });

    if (!user) {
      throw new Error(`User with ${email} not found.`);
    }
    return res.json({
      ok: true,
      msg: 'Login successful',
      data: convertUserData(user?.toJSON()),
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
    const user: IUser = await User.findById(id);

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

    const user: IUser = await User.findOne({ wallet: walletId });

    if (!user) {
      throw new Error(`User with wallet address ${walletId} not found.`);
    }

    return res.json({
      ok: true,
      msg: 'User Found.',
      data: convertUserData(user?.toJSON()),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};
