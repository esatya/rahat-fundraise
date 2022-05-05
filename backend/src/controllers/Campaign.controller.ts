import { validationResult } from 'express-validator';

import Campaign from '../models/Campaign.model';
import { IRequest, IResponse } from '../interfaces/vendors';

export const getCampaigns = async (req: IRequest, res: IResponse) => {
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
};

export const addCampaign = async (req: IRequest, res: IResponse) => {
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
};

export const updatedCampaign = async (req: IRequest, res: IResponse) => {
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

    const updatedCampaign = await Campaign.findByIdAndUpdate(id, updatedData, {
      runValidators: true,
      new: true,
    });

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
};

export const updateCampaignStatus = async (req: IRequest, res: IResponse) => {
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
};

export const extendCampaignExpiryDate = async (
  req: IRequest,
  res: IResponse,
) => {
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
};

export const removeCampaign = async (req: IRequest, res: IResponse) => {
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
};

export const archiveCampaign = async (req: IRequest, res: IResponse) => {
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
};

export const updateCampaignAmount = async (req: IRequest, res: IResponse) => {
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
};

export const getCampaignById = async (req: IRequest, res: IResponse) => {
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
};
