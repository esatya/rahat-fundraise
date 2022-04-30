import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

import Campaign from '../models/Campaign.model';
import { isObjectIdValidator } from '../utils/helper';
import { CAMPAIGN_OPTIONS } from '../config/constants';

// @Route   GET api/campaign
// @desc    Ping campaign
// @access  Public
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    if (!campaigns) {
      throw new Error('Campaigns not found.');
    }
    return res.json({
      ok: true,
      msg: 'Campaign Route Reached',
      data: campaigns,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ ok: true, msg: error.message || 'Campaign Route Error' });
  }
});

// @Route   POST api/campaign/add
// @desc    Add new campaign
// @access  Public
router.post(
  '/add',
  [
    body('title').isString().isLength({ min: 5 }),
    body('excerpt').isString().isLength({ max: 100 }),
    body('story').isString().optional(),
    body('fundRaiser').isString().optional(),
    body('wallet').isNumeric().toFloat(),
    body('target').isNumeric().toFloat(),
    body('amount').isNumeric().toFloat(),
    body('status').isString().toUpperCase().isIn(CAMPAIGN_OPTIONS).optional(),
    body('expiryDate').isISO8601({ strict: true }).isAfter(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.body);
      // Add Campaign
      const campaign = new Campaign(req.body);

      const savedCampaign = await campaign.save();

      return res.json({
        ok: true,
        msg: 'Campaign Route Reached',
        data: savedCampaign,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// @Route   POST api/campaign/add
// @desc    List All Campaigns
// @access  Public
router.post(
  '/update',
  [
    body('id').isString().custom(isObjectIdValidator),
    body('title').isString().isLength({ min: 5 }).optional(),
    body('excerpt').isString().isLength({ max: 100 }).optional(),
    body('story').isString().optional(),
    body('fundRaiser').isString().optional(),
    body('wallet').isNumeric().toFloat().optional(),
    body('target').isNumeric().toFloat().optional(),
    body('amount').isNumeric().toFloat().optional(),
    body('status').isString().toUpperCase().isIn(CAMPAIGN_OPTIONS).optional(),
    body('expiryDate').isISO8601({ strict: true }).isAfter().optional(),
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

      const updatedCampaign = await Campaign.findByIdAndUpdate(
        id,
        updatedData,
        {
          runValidators: true,
          new: true,
        },
      );

      if (!updatedCampaign) {
        return res.status(400).json({
          error: 'Campaign does not exist',
        });
      }

      return res.json({
        ok: true,
        msg: 'Campaign Updated',
        data: updatedCampaign,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// @Route   POST api/campaign/update-status
// @desc    List All Campaigns
// @access  Public
router.post(
  '/update-status',
  [
    body('id').isString().custom(isObjectIdValidator),
    body('status').isString().toUpperCase().isIn(CAMPAIGN_OPTIONS),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, status } = req.body;

      const updatedCampaign = await Campaign.findByIdAndUpdate(
        id,
        { status },
        {
          runValidators: true,
          new: true,
        },
      );

      if (!updatedCampaign) {
        return res.status(400).json({
          error: 'Campaign does not exist',
        });
      }

      return res.json({
        ok: true,
        msg: 'Campaign Updated',
        data: updatedCampaign,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// @Route   POST api/campaign/extend-expiry-date
// @desc    List All Campaigns
// @access  Public
router.post(
  '/extend-expiry-date',
  [
    body('id').isString().custom(isObjectIdValidator),
    body('extendBy').isInt().toInt(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, extendBy } = req.body;

      const campaign = await Campaign.findById(id);

      if (!campaign) {
        return res.status(400).json({
          error: 'Campaign does not exist',
        });
      }

      const expiryDate = new Date(campaign.expiryDate);

      campaign.expiryDate = expiryDate.setDate(expiryDate.getDate() + extendBy);

      const updatedCampaign = await campaign.save({
        validateModifiedOnly: true,
      });

      return res.json({
        ok: true,
        msg: 'Campaign Updated',
        data: updatedCampaign,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// @Route   POST api/campaign/remove
// @desc    List All Campaigns
// @access  Public
router.post(
  '/remove',
  [body('id').isString().custom(isObjectIdValidator)],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.body;

      const campaign = await Campaign.findByIdAndDelete(id);

      if (!campaign) {
        return res.status(400).json({
          error: 'Campaign does not exist',
        });
      }

      // Delete Success. No Content Success
      return res.status(200).json({ ok: true, msg: 'Campaign deleted' });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// @Route   POST api/campaign/archive
// @desc    List All Campaigns
// @access  Public
router.post(
  '/archive',
  [body('id').isString().custom(isObjectIdValidator)],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.body;

      const campaign = await Campaign.findByIdAndUpdate(
        id,
        { status: 'ARCHIVE' },
        { runValidators: true, new: true },
      );

      if (!campaign) {
        return res.status(400).json({
          error: 'Campaign does not exist',
        });
      }

      return res.json({
        ok: true,
        msg: 'Campaign Updated',
        data: campaign,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// @Route   POST api/campaign/update-amt
// @desc    List All Campaigns
// @access  Public
router.post(
  '/update-amt',
  [
    body('id').isString().custom(isObjectIdValidator),
    body('amount').isNumeric().toFloat(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, amount } = req.body;

      const campaign = await Campaign.findByIdAndUpdate(
        id,
        { amount },
        { runValidators: true, new: true },
      );

      if (!campaign) {
        return res.status(400).json({
          error: 'Campaign does not exist',
        });
      }

      return res.json({
        ok: true,
        msg: 'Campaign Updated',
        data: campaign,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// @Route   GET api/campaign/get-by-id
// @desc    Get Campaign By ID - Google
// @access  Public
router.post(
  '/get-by-id',
  [body('id').isString().custom(isObjectIdValidator)],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
      }
      const { id } = req.body;
      const campaign = await Campaign.findById(id);

      if (!campaign) {
        throw new Error(`Campaign not found.`);
      }
      return res.json({
        ok: true,
        msg: 'Campaign Found.',
        data: campaign,
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
      }
      return res
        .status(401)
        .json({ ok: false, msg: error.message || 'Campaign Route Error' });
    }
  },
);

// Export the routes of person
export default router;
