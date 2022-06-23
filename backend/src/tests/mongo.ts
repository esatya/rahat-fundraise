import CampaignModel from '../models/Campaign.model';
import UserModel from '../models/User.model';
import DonationModel from '../models/Donation.model';

const mongoose = require('mongoose');

module.exports = {
  async connectDatabase() {
    await mongoose.connect(process.env.MONGODB_URL);
    await mongoose.connection.db.dropDatabase();
  },

  async closeDatabase(done: any) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect(done);
  },

  async clearDatabase() {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany();
    }
  },

  async getCreatedUser() {
    const user = new UserModel({
      email: 'testss@test.com',
      alias: 'testss',
      image: '',
    });
    await user.save();
    const savedUser = await UserModel.find({ email: user.email });
    return savedUser;
  },

  async getCreatedCampaign(userId: string) {
    const campaign = new CampaignModel({
      file: {
        filename: 'test.png',
      },
      wallets: [
        {
          name: 'wallet1',
          walletAddress: 'wallet1',
        },
        {
          name: 'wallet2',
          walletAddress: 'wallet2',
        },
      ],
      creator: userId,
      title: 'title 1',
      story: 'This is story',
      target: 1000,
      expiryDate: '2099-01-01',
      status: 'PUBLISHED',
    });
    await campaign.save();
    const savedCampaigns = await CampaignModel.find().populate('creator');
    return savedCampaigns;
  },

  async getCreatedDonation(campaignId: string) {
    const donation = new DonationModel({
      transactionId: 'TrasnctionId 1' + Math.floor(Math.random() * 100000),
      campaignId,
      walletAddress: 'Wallet1',
      donor: {
        fullName: 'Full name',
        email: 'test@test.com',
        country: 'NP',
      },
      isVerified: false,
      amount: 100,
    });
    await donation.save();
    const savedDonations = await DonationModel.find();
    return savedDonations;
  },

  convertToObjectID(id: string) {
    return mongoose.Types.ObjectId(id);
  },
};
