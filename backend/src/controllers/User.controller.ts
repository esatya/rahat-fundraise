import jsonwebtoken from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { IUser } from '../interfaces/models/User';
import { IRequest, IResponse } from '../interfaces/vendors';

import User from '../models/User.model';
import transporter from '../services/mail.service';
import { secret, senderEmail } from '../config/keys';
import { convertUserData, generateOTP } from '../utils/helper';

export const pingUser = async (req: IRequest, res: IResponse) => {
  try {
    return res.json({ ok: true, msg: 'User Route Reached' });
  } catch (error) {
    return res.status(401).json({ ok: true, msg: 'User Route Error' });
  }
};

export const listUsers = async (req: IRequest, res: IResponse) => {
  try {
    const users = await User.find();
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

    // Unique validation
    const userWithEmail = await User.findOne({
      email: req.body.email,
    });

    if (userWithEmail) {
      return res.status(400).json({
        error: 'email already in use',
      });
    }
    const userWithAlias = await User.findOne({
      alias: req.body.alias,
    });

    if (userWithAlias) {
      return res.status(400).json({
        error: 'alias already in use',
      });
    }
    // Add User
    const user = new User(req.body);

    const savedUser = await user.save();

    return res.json({ ok: true, msg: 'User Route Reached', data: savedUser });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const registerUser = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User<IUser>(req.body);

    const savedUser = await user.save();

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

export const updateUserById = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, ...updatedData } = req.body;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        error: 'Must have one valid field to update',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      runValidators: true,
      new: true,
    });

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
    const { user } = req;
    const { wallet } = req.body;

    if (!user) {
      throw new Error(`User from Token failed.`);
    }

    user.wallet = [...(user.wallet || []), wallet];
    const updatedUser = await user.save({ validateModifiedOnly: true });

    return res.json({
      ok: true,
      msg: 'Login Successful',
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
    const user = await User.findOne({ _id: req.userId });

    return res.json({
      ok: true,
      msg: 'Login Successful',
      data: convertUserData(user.toObject()),
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

    const { email } = req.body;
    const user = await User.findOne({ email });

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
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ ok: false, errors: errors.array() });
    // }

    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error(`User with ${email} not found.`);
    }

    const OTP = generateOTP();

    console.log('OTP: ', OTP);

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

    //   SEND SMS

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
    const { email, otpNumber } = req.body;

    const user = await User.findOne({ email: email, 'otp.number': otpNumber });

    const { number, expiry } = user.otp;

    if (number !== otpNumber || expiry < Date.now()) {
      throw new Error(`Invalid/Expired OTP.`);
    }

    // return json web token in response
    // for user populate verification model that relate to specific user
    const token = jsonwebtoken.sign(
      { id: user?._id, email: user?.email, alias: user?.alias },
      secret,
      { expiresIn: '1h' },
    );

    res.json({
      ok: true,
      token: token,
      msg: 'OTP Verified',
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

export const socialLogin = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
    const { email, social } = req.body;
    const user = await User.findOne({
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

export const getUserBySocialId = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
    const { id } = req.body;
    const user = await User.findById(id);

    if (!user) {
      throw new Error(`User not found.`);
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

export const getUsersByWalletId = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
    const { walletId } = req.body;
    const users = await User.find({ wallet: { $in: [walletId] } });

    if (!users) {
      throw new Error(`User with wallet address ${walletId} not found.`);
    }

    if (users.length === 0) {
      throw new Error(`No User with wallet address ${walletId}.`);
    }
    return res.json({
      ok: true,
      msg: 'Users Found.',
      data: users.map((user) => convertUserData(user?.toJSON())),
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};
