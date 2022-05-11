import { validationResult } from 'express-validator';

import Donation from '../models/Donation.model';
import Campaign from '../models/Campaign.model';

import { senderEmail } from '../config/keys';
import { IRequest, IResponse } from '../interfaces/vendors';
import transporter from '../services/mail.service';

export const getDonations = async (req: IRequest, res: IResponse) => {
  try {
    const donations = await Donation.find();

    if (!donations.length) {
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

export const getDonationsForCampaign = async (
  req: IRequest,
  res: IResponse,
) => {
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

    const donation = new Donation({ ...req.body });

    const savedDonation = await donation.save();

    campaign.amount += req.body.amount;

    await campaign.save({
      validateModifiedOnly: true,
    });

    return res.json({
      ok: true,
      msg: 'Donation Added',
      data: savedDonation,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const sendReceiptToEmail = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { donationId, email } = req.body;

    const donation = await Donation.findById(donationId).populate('campaignId');

    if (!donation) {
      throw Error('Donation not found');
    }

    const message = {
      from: senderEmail,
      to: email,
      subject: 'Donation Receipt',
      text: `Thanks for the donation of ${donation.amount} to ${donation.campaignId.title}`,
    };

    transporter.sendMail(message);

    return res.json({
      ok: true,
      msg: `Receipt sent`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};

export const verifyDonation = async (req: IRequest, res: IResponse) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.body;

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
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
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
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    return res.status(401).json({ ok: false, msg: 'User Route Error' });
  }
};
