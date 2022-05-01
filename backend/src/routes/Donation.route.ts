import Uuid from 'uuid';
import express from 'express';
import { body, validationResult } from 'express-validator';

import Donation from '../models/Donation.model';
import Campaign from '../models/Campaign.model';

import { isObjectIdValidator } from '../utils/helper';
import { IRequest, IResponse } from '../interfaces/vendors';

const router = express.Router();

// @Route   GET api/donation
// @desc    All donations
// @access  Public
router.get('/', async (req: IRequest, res: IResponse) => {
  try {
    const donations = await Donation.find();
    if (!donations) {
      throw new Error('Donations not found.');
    }
    return res.json({
      ok: true,
      msg: 'Donation Route Reached',
      data: donations,
    });
  } catch (error) {
    return res.status(401).json({ ok: true, msg: 'User Route Error' });
  }
});

// @Route   post api/donation/campaign
// @desc    All donations for a campaign
// @access  Public
router.post(
  '/campaign',
  [body('campaignId').isString().custom(isObjectIdValidator)],
  async (req: IRequest, res: IResponse) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { campaignId } = req.body;
      const donations = await Donation.find({ campaignId });
      if (!donations) {
        throw new Error('Donations not found.');
      }
      return res.json({
        ok: true,
        msg: 'Donation Route Reached',
        data: donations,
      });
    } catch (error) {
      return res.status(401).json({ ok: true, msg: 'User Route Error' });
    }
  },
);

// @Route   POST api/donation/add
// @desc    Add new donation
// @access  Public
router.post(
  '/add',
  [
    body('campaignId').isString().custom(isObjectIdValidator),
    body('donor').isObject(),
    body('donor.firstName').isString().isLength({ min: 1 }),
    body('donor.lastName').isString().isLength({ min: 1 }),
    body('donor.country').isString().isLength({ min: 1 }),
    body('donor.state').isString().isLength({ min: 1 }),
    body('donor.address1').isString().isLength({ min: 1 }),
    body('donor.address2').isString().isLength({ min: 1 }),
    body('donor.contact').isString().isLength({ min: 1 }),
    body('donor.zip').isString().isLength({ min: 1 }),
    body('isAnonymous').toBoolean(true).optional(),
    // body('isVerified').toBoolean(true).optional(),
    body('amount').isNumeric().toFloat(),
  ],
  async (req: IRequest, res: IResponse) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const campaign = await Campaign.findById(req.body.campaignId);

      if (!campaign) {
        throw new Error(`Campaign not found.`);
      }

      // Add Donation
      const donation = new Donation({ ...req.body, transactionId: Uuid.v4() });

      const savedDonation = await donation.save();

      campaign.amount += req.body.amount;

      await campaign.save({
        validateModifiedOnly: true,
      });

      return res.json({
        ok: true,
        msg: 'Donation Route Reached',
        data: savedDonation,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Donation Route Error' });
    }
  },
);

// @Route   POST api/donation/send-receipt-to-email
// @desc    Add new donation
// @access  Public
router.post(
  '/send-receipt-to-email',
  [
    body('id').isString().custom(isObjectIdValidator),
    body('email').isEmail().normalizeEmail(),
  ],
  async (req: IRequest, res: IResponse) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, email } = req.body;
      // Add Donation
      const donation = await Donation.findById(id).populate('campaignId');

      if (!donation) {
        throw Error('Donation not found');
      }

      const receipt = `Thanks for the donation of ${donation.amount} to "${donation.campaignId.title}"`;

      return res.json({
        ok: true,
        msg: `Email sent to ${email}`,
        data: receipt,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Donation Route Error' });
    }
  },
);

// @Route   POST api/donation/verify-donation
// @desc    Add new donation
// @access  Public
router.post(
  '/verify-donation',
  [body('id').isString().custom(isObjectIdValidator)],
  async (req: IRequest, res: IResponse) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.body;
      // Add Donation
      const donation = await Donation.findByIdAndUpdate(id, {
        isVerified: true,
      });

      if (!donation) {
        throw Error('Donation not found');
      }

      return res.json({
        ok: true,
        msg: 'Donation Verified Successfully',
        data: donation,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Donation Route Error' });
    }
  },
);

// @Route   POST api/donation/approve-donation
// @desc    Add new donation
// @access  Public
router.post(
  '/approve-donation',
  [body('id').isString().custom(isObjectIdValidator)],
  async (req: IRequest, res: IResponse) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.body;
      // Add Donation
      const donation = await Donation.findByIdAndUpdate(id, {
        isVerified: true,
      });

      if (!donation) {
        throw Error('Donation not found');
      }

      return res.json({
        ok: true,
        msg: 'Donation Approved Successfully',
        data: donation,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Donation Route Error' });
    }
  },
);

// Export the routes of person
export default router;
