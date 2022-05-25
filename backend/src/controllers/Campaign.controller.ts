import { validationResult } from 'express-validator';

import User from '../models/User.model';
import Campaign from '../models/Campaign.model';

import { TCampaign, TUser } from '../types';
import { ICampaign } from '../interfaces/models';
import { IRequest, IResponse } from '../interfaces/vendors';

export const getCampaigns = async (req: IRequest, res: IResponse) => {
  try {
    const campaigns = await Campaign.find({ status: 'PUBLISHED' }).populate(
      'creator',
    );

    if (!campaigns) {
      throw new Error('Campaigns not found.');
    }

    return res.json({
      ok: true,
      msg: 'Campaigns found.',
      data: campaigns,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};

export const addCampaign = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user: TUser = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: 'You are not authorized to create this campaign',
      });
    }

    const wallets = JSON.parse(req.body?.wallets) || [];

    const imageUrl = req.file
      ? `/uploads/campaigns/${req.file.filename}`
      : null;

    const campaign: ICampaign = new Campaign({
      ...req.body,
      image: imageUrl,
      wallets: wallets,
      creator: req.userId,
    });

    const savedCampaign: ICampaign = await campaign.save();

    const updatedCampaigns = [...user.campaigns, campaign];

    await User.findByIdAndUpdate(
      req.userId,
      { campaigns: updatedCampaigns },
      {
        runValidators: true,
        new: true,
      },
    );

    return res.json({
      ok: true,
      msg: 'Campaign Added',
      data: savedCampaign,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};

export const updateCampaign = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const campaignId: string = req.params.campaignId;
    const { ...updatedData } = req.body;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        error: 'Must have one valid field to update',
      });
    }

    const campaign: TCampaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(400).json({
        error: 'Campaign does not exist',
      });
    }

    if (req.userId !== campaign.creator._id.toString()) {
      return res.status(401).json({
        error: 'You are not authorized to update this campaign',
      });
    }

    const wallets = JSON.parse(req.body?.wallets) || [];

    const imageUrl = req.file
      ? `/uploads/campaigns/${req.file.filename}`
      : campaign?.image;

    const updatedCampaign: TCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { ...updatedData, image: imageUrl, wallets: wallets },
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
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};

export const updateCampaignStatus = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const campaignId: string = req.params.campaignId;
    const { status } = req.body;

    const campaign: TCampaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(400).json({
        error: 'Campaign does not exist',
      });
    }

    if (req.userId !== campaign.creator._id.toString()) {
      return res.status(401).json({
        error: 'You are not authorized to update this campaign',
      });
    }

    campaign.status = status;

    const updatedCampaign = await campaign.save({
      validateModifiedOnly: true,
    });

    return res.json({
      ok: true,
      msg: 'Campaign Status Updated',
      data: updatedCampaign,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
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

    const campaignId: string = req.params.campaignId;
    const extendBy: number = req.body.extendBy;

    const campaign: TCampaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(400).json({
        error: 'Campaign does not exist',
      });
    }

    if (req.userId !== campaign.creator._id.toString()) {
      return res.status(401).json({
        error: 'You are not authorized to update this campaign',
      });
    }

    const expiryDate = new Date(campaign.expiryDate).getTime();

    const newExpiryDate = expiryDate + extendBy * 24 * 60 * 60 * 1000;

    campaign.expiryDate = new Date(newExpiryDate).toISOString();

    const updatedCampaign = await campaign.save({
      validateModifiedOnly: true,
    });

    return res.json({
      ok: true,
      msg: 'Campaign Updated',
      data: updatedCampaign,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};

export const removeCampaign = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const campaignId = req.params.campaignId;

    const campaign: TCampaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(400).json({
        error: 'Campaign does not exist',
      });
    }

    if (req.userId !== campaign.creator._id.toString()) {
      return res.status(401).json({
        error: 'You are not authorized to update this campaign',
      });
    }

    await Campaign.findByIdAndDelete(campaignId);

    return res.status(200).json({ ok: true, msg: 'Campaign deleted' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};

export const archiveCampaign = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const campaignId = req.params.campaignId;

    const campaign: TCampaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(400).json({
        error: 'Campaign does not exist',
      });
    }

    if (req.userId !== campaign.creator._id.toString()) {
      return res.status(401).json({
        error: 'You are not authorized to update this campaign',
      });
    }

    campaign.status = 'ARCHIVE';

    const updatedCampaign: ICampaign = await campaign.save({
      validateModifiedOnly: true,
    });

    return res.json({
      ok: true,
      msg: 'Campaign Updated',
      data: updatedCampaign,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};

export const updateCampaignAmount = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { campaignId } = req.params;
    const amount: number = req.body.amount;

    const campaign: TCampaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(400).json({
        error: 'Campaign does not exist',
      });
    }

    if (req.userId !== campaign.creator._id.toString()) {
      return res.status(401).json({
        error: 'You are not authorized to update this campaign',
      });
    }

    const updatedCampaign: TCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { amount },
      { runValidators: true, new: true },
    );

    return res.json({
      ok: true,
      msg: 'Campaign Updated',
      data: updatedCampaign,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};

export const getCampaignById = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const campaignId = req.params.campaignId;
    const campaign = await Campaign.findOne({
      _id: campaignId,
      //   status: 'PUBLISHED',
    });

    if (!campaign) {
      throw new Error(`Campaign not found.`);
    }

    return res.json({
      ok: true,
      msg: 'Campaign Found.',
      data: campaign,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'Campaign Route Error' });
  }
};
