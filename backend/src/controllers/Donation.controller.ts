import Uuid from 'uuid';
import { validationResult } from 'express-validator';

import Donation from '../models/Donation.model';
import Campaign from '../models/Campaign.model';

import { IRequest, IResponse } from '../interfaces/vendors';

export const getDonations = async (req: IRequest, res: IResponse) => {
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
};

export const getDonationsForCampaign =
  async (req: IRequest, res: IResponse) =>
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
  };

export const addDonation = async (req: IRequest, res: IResponse) => {
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
};

export const sendReceiptToEmail = async (req: IRequest, res: IResponse) => {
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
};

export const verifyDonation = async (req: IRequest, res: IResponse) => {
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
};

export const approveDonation = async (req: IRequest, res: IResponse) => {
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
};
