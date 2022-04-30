import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

import User from '../models/User.model';
import { secret } from '../config/keys';

import { userExtractor } from '../utils/middleware';
import { convertUserData, isObjectIdValidator } from '../utils/helper';

const router = express.Router();

const newUserValidationRules = [
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

// @Route   GET api/user
// @desc    Ping user
// @access  Public
router.get('/', async (req, res) => {
  try {
    return res.json({ ok: true, msg: 'User Route Reached' });
  } catch (error) {
    return res.status(401).json({ ok: true, msg: 'User Route Error' });
  }
});

// @Route   GET api/user/all
// @desc    List All Users
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error('Users not found.');
    }
    return res.json({ ok: true, msg: 'User Route Reached', data: users });
  } catch (error) {
    return res
      .status(401)
      .json({ ok: false, msg: error.message || 'User Route Error' });
  }
});

// @Route   POST api/user/add
// @desc    List All Users
// @access  Public
router.post('/add', newUserValidationRules, async (req, res) => {
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
    return res
      .status(401)
      .json({ ok: false, msg: error.message || 'User Route Error' });
  }
});

// @Route   POST api/user/register
// @desc    Register new user
// @access  Public
router.post('/register', newUserValidationRules, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // // Unique validation
    // const userWithEmail = await User.findOne({
    //   email: req.body.email,
    // });

    // if (userWithEmail) {
    //   return res.status(400).json({
    //     error: 'email already in use',
    //   });
    // }
    // const userWithAlias = await User.findOne({
    //   alias: req.body.alias,
    // });

    // if (userWithAlias) {
    //   return res.status(400).json({
    //     error: 'alias already in use',
    //   });
    // }

    // Add User
    const user = new User(req.body);

    const savedUser = await user.save();

    return res.json({
      ok: true,
      msg: 'User Route Reached',
      data: convertUserData(savedUser?.toJSON()),
    });
  } catch (error) {
    return res
      .status(401)
      .json({ ok: false, msg: error.message || 'User Route Error' });
  }
});

// @Route   POST api/user/add
// @desc    List All Users
// @access  Public
router.post(
  '/update-by-id',
  [
    body('id').isString().custom(isObjectIdValidator),
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
  ],
  async (req, res) => {
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
      console.log(error);
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'User Route Error' });
    }
  },
);
// @Route   POST api/user/add-wallet
// @desc    Add Wallet
// @access  Public
router.post(
  '/add-wallet',
  [body('wallet').isString()],
  userExtractor,
  async (req, res) => {
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
      user.wallet = [...user.wallet, wallet];
      const updatedUser = await user.save({
        validateModifiedOnly: true,
      });

      return res.json({
        ok: true,
        msg: 'Login Successful',
        data: convertUserData(updatedUser?.toJSON()),
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'User Route Error' });
    }
  },
);

// @Route   POST api/user/get-my-profile
// @desc    Get My Profile. Assumes JWT token is passed
// @access  Public
router.get('/get-my-profile', userExtractor, async (req, res) => {
  try {
    // console.log(req.user);
    return res.json({
      ok: true,
      msg: 'Login Successful',
      data: convertUserData(req.user?.toJSON()),
    });
  } catch (error) {
    return res
      .status(401)
      .json({ ok: false, msg: error.message || 'User Route Error' });
  }
});

// @Route   POST api/user/login
// @desc    User Login with Email & OTP
// @access  Public
router.post('/login', [body('email').exists().isEmail()], async (req, res) => {
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
    console.log(user);
    const token = jsonwebtoken.sign(
      { id: user?._id, email: user?.email, alias: user?.alias },
      secret,
    );
    return res.json({
      ok: true,
      msg: 'Login Successful',
      data: convertUserData(user?.toJSON()),
      token,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ ok: false, msg: error.message || 'User Route Error' });
  }
});

// @Route   POST api/user/social-login
// @desc    Social Login - Google
// @access  Public
router.post(
  '/social-login',
  [body('email').isEmail(), body('social').isString()],
  async (req, res) => {
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
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'User Route Error' });
    }
  },
);

// @Route   GET api/user/get-by-id
// @desc    Get User By ID - Google
// @access  Public
router.post(
  '/get-by-id',
  [body('id').exists().isString().custom(isObjectIdValidator)],
  async (req, res) => {
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
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'User Route Error' });
    }
  },
);

// @Route   GET api/user/get-by-walletid
// @desc    Get User By ID - Google
// @access  Public
router.post(
  '/get-by-walletid',
  [body('walletId').exists().isString()],
  async (req, res) => {
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
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'User Route Error' });
    }
  },
);

// Export the routes of person
export default router;
