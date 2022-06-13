import UserModel from '../../models/User.model';

const {
  connectDatabase,
  closeDatabase,
  clearDatabase,
  convertToObjectID,
  getCreatedUser,
  getCreatedCampaign,
  getCreatedDonation,
} = require('../mongo');

const {
  listUsers,
  addUser,
  getProfile,
  registerUser,
  userLogin,
  sendOTP,
  verifyOTP,
  getUserById,
  addWallet,
  getUsersByWalletId,
  updateUserById,
} = require('../../controllers/User.controller');

const {
  addCampaign,
  getCampaigns,
  updateCampaignStatus,
  getCampaignById,
  updateCampaignAmount,
  archiveCampaign,
  removeCampaign,
  extendCampaignExpiryDate,
  updateCampaign,
} = require('../../controllers/Campaign.controller');

const {
  addDonation,
  getDonationsForCampaign,
  approveDonation,
  verifyDonation,
  getDonations,
  sendReceiptToEmail,
} = require('../../controllers/Donation.controller');

let user: { id: any }[] = [];
let createdCampaign: any[] = [];
let donation: any[] = [];

describe('User Controller', () => {
  beforeAll(async () => {
    await connectDatabase();
    user = await getCreatedUser();
  });
  afterAll(async () => {
    await clearDatabase();
    await closeDatabase();
  });

  it('list all user users', async () => {
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await listUsers(mockRequest, mockResponse);
    const userList = user;

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'User Route Reached',
      data: userList,
    });
  });

  it('register  new user', async () => {
    const mockRequest = {
      body: {
        alias: 'makai',
        email: 'test@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await registerUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      msg: 'User Registered Successfully',
      data: expect.anything(),
    });
  });

  it('register with same email', async () => {
    const mockRequest = {
      body: {
        alias: 'makai',
        email: 'test@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await registerUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      msg: 'This email is already registered. Please sign in with the email address.',
    });
  });

  it('register with same alias', async () => {
    const mockRequest = {
      body: {
        alias: 'makai',
        email: 'test2@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await registerUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      msg: 'Username already taken.',
    });
  });

  it('login user with registered email', async () => {
    const mockRequest = {
      body: {
        email: 'test@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    await userLogin(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      msg: 'User Exists',
      data: {
        email: 'test@test.com',
      },
    });
  });

  it('login user with unregistered email', async () => {
    const mockRequest = {
      body: {
        email: 'nomail@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await userLogin(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      msg: 'The email is not registered. Please sign up first.',
    });
  });

  it('sent OTP to registered email', async () => {
    const mockRequest = {
      body: {
        email: 'test@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await sendOTP(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      msg: 'OTP Sent',
    });
  });

  it('sent OTP to unregistered email', async () => {
    const mockRequest = {
      body: {
        email: 'nomail@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await sendOTP(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      msg: 'User with nomail@test.com not found.',
    });
  });

  it('verify OTP fail for unregistered email', async () => {
    const mockRequest = {
      body: {
        email: 'nomail@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await verifyOTP(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      msg: 'User does not exist or OTP is invalid',
    });
  });

  it('verify OTP fail for registered email with expired OTP', async () => {
    const tempUser = await UserModel.findOne({ email: 'test@test.com' });
    if (tempUser && tempUser.otp) {
      const newExpiryDate = Date.now() - 6 * 60000;
      await UserModel.findOneAndUpdate(
        { email: 'test@test.com' },
        {
          'otp.expiry': newExpiryDate,
        },
      );
    }

    const mockRequest = {
      body: {
        email: 'test@test.com',
        otpNumber: tempUser?.otp?.number,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await verifyOTP(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      msg: 'Invalid/Expired OTP.',
    });
  });

  it('verify OTP to login attempt email', async () => {
    const otpRequest = {
      body: {
        email: 'test@test.com',
      },
    };
    const otpResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    await sendOTP(otpRequest, otpResponse);
    const tempUser = await UserModel.findOne({ email: 'test@test.com' });
    const mockRequest = {
      body: {
        email: 'test@test.com',
        otpNumber: tempUser?.otp?.number,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await verifyOTP(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      token: expect.anything(),
      msg: 'OTP Verified',
      isEmailVerified: true,
    });
  });

  it('add a different user', async () => {
    const mockRequest = {
      body: {
        alias: 'makai2',
        email: 'test2@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      msg: 'New User added',
      data: expect.anything(),
    });
  });

  it('add a different user with same email', async () => {
    const mockRequest = {
      body: {
        alias: 'makai23',
        email: 'test2@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'email already in use',
    });
  });

  it('add a different user with same alias', async () => {
    const mockRequest = {
      body: {
        alias: 'makai2',
        email: 'test22@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'alias already in use',
    });
  });

  it('get profile of user', async () => {
    const mockRequest = {
      userId: user[0].id,
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getProfile(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'User Data',
      data: expect.anything(),
    });
  });

  it('get profile of random fake id', async () => {
    const mockRequest = {
      userId: convertToObjectID('578df3efb618f5141202a196'),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getProfile(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'User does not exist.',
    });
  });

  it('update user by id', async () => {
    const mockRequest = {
      userId: user[0].id,
      body: {
        email: 'new@email.com',
        phone: '123123',
        alias: 'newalias',
        bio: 'ASDFASDFASDFASDf',
        name: 'TEST USER',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateUserById(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'User Updated',
      data: expect.anything(),
    });
  });

  it('update user by id with existing email', async () => {
    const mockRequest = {
      userId: user[0].id,
      body: {
        email: 'test2@test.com',
        phone: '123123',
        alias: 'newalias',
        bio: 'ASDFASDFASDFASDf',
        name: 'TEST USER',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateUserById(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'This email is already registered.',
    });
  });

  it('update user by id with existing alias', async () => {
    const mockRequest = {
      userId: user[0].id,
      body: {
        email: 'test23@test.com',
        phone: '123123',
        alias: 'makai2',
        bio: 'ASDFASDFASDFASDf',
        name: 'TEST USER',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateUserById(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Username already taken.',
    });
  });

  it('get user by id', async () => {
    const mockRequest = {
      params: {
        id: user[0].id,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getUserById(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'User Found.',
      data: expect.anything(),
    });
  });

  it('get user by random id', async () => {
    const mockRequest = {
      params: {
        id: '578df3efb61825131202a196',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getUserById(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'User not found.',
    });
  });

  it('add wallet to user', async () => {
    const mockRequest = {
      userId: user[0].id,
      body: {
        walletId: 'UserWalletId',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addWallet(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Wallet Added',
      data: expect.anything(),
    });
  });

  it('add wallet to random user', async () => {
    const mockRequest = {
      userId: '578df3efb61825131202a196',
      body: {
        walletId: 'UserWalletId',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addWallet(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: `User does not exist.`,
    });
  });

  it('get user by wallet id', async () => {
    const mockRequest = {
      params: {
        walletId: 'UserWalletId',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getUsersByWalletId(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'User Found.',
      data: expect.anything(),
    });
  });

  it('get user by invalid wallet id', async () => {
    const mockRequest = {
      params: {
        walletId: '578df3efb61825131202a196',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getUsersByWalletId(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: `User with wallet address 578df3efb61825131202a196 not found.`,
    });
  });
});

describe('Campaign Controller', () => {
  beforeAll(async () => {
    await connectDatabase();
    user = await getCreatedUser();
    createdCampaign = await getCreatedCampaign(user[0].id);
  });
  afterAll(async () => {
    await clearDatabase();
    await closeDatabase();
  });

  it('list all campaign', async () => {
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getCampaigns(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaigns found.',
      data: createdCampaign,
    });
  });

  it('list created campaign by id', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getCampaignById(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Found.',
      data: createdCampaign[0],
    });
  });

  it('create a new campaign', async () => {
    const stringifiedWallets = [
      {
        name: 'Binance',
        walletAddress: '0x18a6558D507def9456D04AbA8DbC425e7386Aa96',
      },
    ];
    const mockRequest = {
      body: {
        file: {
          filename: 'test.png',
        },
        wallets: JSON.stringify(stringifiedWallets),
        title: 'title 1',
        story: 'This is story',
        target: 1000,
        expiryDate: '2099-01-01',
        status: 'PUBLISHED',
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addCampaign(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Added',
      data: expect.anything(),
    });
  });

  it('create a new campaign by random user', async () => {
    const stringifiedWallets = [
      {
        name: 'Binance',
        walletAddress: '0x18a6558D507def9456D04AbA8DbC425e7386Aa96',
      },
    ];
    const mockRequest = {
      body: {
        file: {
          filename: 'test.png',
        },
        wallets: JSON.stringify(stringifiedWallets),
        title: 'title 1',
        story: 'This is story',
        target: 1000,
        expiryDate: '2099-01-01',
        status: 'PUBLISHED',
      },
      userId: '578df3efb61825131202a196',
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addCampaign(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'You are not authorized to create this campaign',
    });
  });

  it('update a valid campaign', async () => {
    const stringifiedWallets = [
      {
        name: 'Binance',
        walletAddress: '0x18a6558D507def9456D04AbA8DbC425e7386Aa96',
      },
    ];
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        file: {
          filename: 'test.png',
        },
        wallets: JSON.stringify(stringifiedWallets),
        title: 'title 1',
        story: 'This is updated story',
        target: 1000,
        expiryDate: '2099-01-01',
        status: 'PUBLISHED',
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaign(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Updated',
      data: expect.anything(),
    });
  });

  it('update an invalid campaign', async () => {
    const stringifiedWallets = [
      {
        name: 'Binance',
        walletAddress: '0x18a6558D507def9456D04AbA8DbC425e7386Aa96',
      },
    ];
    const mockRequest = {
      params: {
        campaignId: '578df3efb618f5141202a196',
      },
      body: {
        file: {
          filename: 'test.png',
        },
        wallets: JSON.stringify(stringifiedWallets),
        title: 'title 1',
        story: 'This is updated story',
        target: 1000,
        expiryDate: '2099-01-01',
        status: 'PUBLISHED',
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaign(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Campaign does not exist',
    });
  });

  it('update an valid campaign by random user', async () => {
    const stringifiedWallets = [
      {
        name: 'Binance',
        walletAddress: '0x18a6558D507def9456D04AbA8DbC425e7386Aa96',
      },
    ];
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        file: {
          filename: 'test.png',
        },
        wallets: JSON.stringify(stringifiedWallets),
        title: 'title 1',
        story: 'This is updated story',
        target: 1000,
        expiryDate: '2099-01-01',
        status: 'PUBLISHED',
      },
      userId: '578df3efb618f5141202a196',
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaign(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'You are not authorized to update this campaign',
    });
  });

  it('update a valid campaign with 0 fields', async () => {
    const mockRequest = {
      params: {
        campaignId: '578df3efb618f5141202a196',
      },
      body: {},
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaign(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Must have one valid field to update',
    });
  });

  it('update campaign status', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        status: 'DRAFT',
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaignStatus(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Status Updated',
      data: expect.anything(),
    });
  });

  it('update campaign status of invalid campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: '578df3efb618f5141202a196',
      },
      body: {
        status: 'DRAFT',
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaignStatus(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({
      error: 'Campaign does not exist',
    });
  });

  it('update campaign status by random user', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        status: 'DRAFT',
      },
      userId: '578df3efb618f5141202a196',
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaignStatus(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'You are not authorized to update this campaign',
    });
  });

  it('archive a valid campaign by creator', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await archiveCampaign(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Updated',
      data: expect.anything(),
    });
  });

  it('archive a invalid campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: '578df3efb61825131202a196',
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await archiveCampaign(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({
      error: 'Campaign does not exist',
    });
  });

  it('archive a valid campaign by random user', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      userId: '578df3efb61825131202a196',
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await archiveCampaign(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);

    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'You are not authorized to update this campaign',
    });
  });

  it('update campaign amount by creator', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        amount: 100000,
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaignAmount(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Updated',
      data: expect.anything(),
    });
  });

  it('update campaign amount of invalid campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: '578df3efb61825131202a196',
      },
      body: {
        amount: 100000,
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaignAmount(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      error: 'Campaign does not exist',
    });
  });

  it('update campaign amount by random user', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        amount: 10000,
      },
      userId: '578df3efb61825131202a196',
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await updateCampaignAmount(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      msg: 'You are not authorized to update this campaign',
      ok: false,
    });
  });

  it('get campaign by id', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getCampaignById(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Found.',
      data: expect.anything(),
    });
  });

  it('get campaign by fake id', async () => {
    const mockRequest = {
      params: {
        campaignId: '578df3efb61825131202a196',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getCampaignById(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Campaign not found.',
    });
  });

  it('extend expiry date of invalid campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: '578df3efb61825131202a196',
      },
      body: {
        extendBy: 30,
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await extendCampaignExpiryDate(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({
      error: 'Campaign does not exist',
    });
  });

  it('extend expiry date of campaign by random user', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        extendBy: 30,
      },
      userId: '578df3efb61825131202a196',
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await extendCampaignExpiryDate(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      msg: 'You are not authorized to update this campaign',
      ok: false,
    });
  });

  it('extend expiry date of valid campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      body: {
        extendBy: 30,
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await extendCampaignExpiryDate(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign Updated',
      data: expect.anything(),
    });
  });

  it('remove invalid campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: '578df3efb61825131202a196',
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await removeCampaign(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({
      error: 'Campaign does not exist',
    });
  });

  it('remove valid campaign by random user', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      userId: '578df3efb61825131202a196',
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await removeCampaign(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      msg: 'You are not authorized to update this campaign',
      ok: false,
    });
  });

  it('remove valid campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
      userId: user[0].id,
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await removeCampaign(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Campaign deleted',
    });
  });
});

describe('Donation Controller', () => {
  beforeAll(async () => {
    await connectDatabase();
    user = await getCreatedUser();
    createdCampaign = await getCreatedCampaign(user[0].id);
  });
  afterAll(async () => {
    await clearDatabase();
    await closeDatabase();
  });

  it('list all donations', async () => {
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getDonations(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Donations not found.',
    });
  });

  it('list all donations for a campaign', async () => {
    const mockRequest = {
      params: {
        campaignId: createdCampaign[0].id,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getDonationsForCampaign(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Donation Route Reached',
      data: [],
    });
  });

  it('make a donation for a campaign', async () => {
    const mockRequest = {
      body: {
        campaignId: createdCampaign[0].id,
        transactionId: 'TrnsactionID',
        walletAddress: 'Wallet 1',
        isAnonymous: true,
        amount: 100,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addDonation(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Donation Added',
      data: expect.anything(),
    });
  });

  it('make a donation for invalid campaign', async () => {
    const mockRequest = {
      body: {
        campaignId: '578df3efb61825131202a196',
        transactionId: 'TrnsactionID2',
        walletAddress: 'Wallet 1',
        isAnonymous: true,
        amount: 100,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await addDonation(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Campaign not found.',
    });
  });

  it('list all donations returning value', async () => {
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await getDonations(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Donation Route Reached',
      data: expect.anything(),
    });
  });

  it('verify valid donation', async () => {
    donation = await getCreatedDonation(createdCampaign[0].id);

    const mockRequest = {
      body: {
        id: donation[0].id,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await verifyDonation(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Donation Verified Successfully',
      data: expect.anything(),
    });
  });

  it('verify invalid donation', async () => {
    const mockRequest = {
      body: {
        id: '578df3efb61825131202a196',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await verifyDonation(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Donation not found',
    });
  });

  it('approve valid donation', async () => {
    donation = await getCreatedDonation(createdCampaign[0].id);

    const mockRequest = {
      body: {
        id: donation[0].id,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await approveDonation(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'Donation Approved Successfully',
      data: expect.anything(),
    });
  });

  it('approve invalid donation', async () => {
    const mockRequest = {
      body: {
        id: '578df3efb61825131202a196',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await approveDonation(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: 'Donation not found',
    });
  });

  it('send receipt to email for valid donation', async () => {
    const mockRequest = {
      body: {
        donationId: donation[0].id,
        email: 'test@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await sendReceiptToEmail(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: `Receipt sent`,
    });
  });

  it('send receipt to email for invalid donation', async () => {
    const mockRequest = {
      body: {
        donationId: '578df3efb61825131202a196',
        email: 'test@test.com',
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await sendReceiptToEmail(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith({
      ok: false,
      msg: `Donation not found`,
    });
  });
});
