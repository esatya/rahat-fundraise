import { getUserById } from '../../controllers/User.controller';
import UserModel from '../../models/User.model';

const {
  connectDatabase,
  closeDatabase,
  clearDatabase,
  convertToObjectID,
  getCreatedUser,
  getCreatedCampaign,
} = require('../mongo');

const {
  listUsers,
  addUser,
  getProfile,
  registerUser,
  userLogin,
  sendOTP,
  verifyOTP,
} = require('../../controllers/User.controller');

const {
  addCampaign,
  getCampaigns,
  updateCampaignStatus,
  getCampaignById,
} = require('../../controllers/Campaign.controller');

const {
  getDonationsForCampaign,
  addDonation,
} = require('../../controllers/Donation.controller');

let user: { id: any }[] = [];
let createdCampaign: any[] = [];

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

  // it('login user with registered email', async () => {
  //   const mockRequest = {
  //     body: {
  //       email: 'test@test.com',
  //     },
  //   };
  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     send: jest.fn(),
  //     json: jest.fn(),
  //   };
  //   axios.get.mockResolvedValueOnce(mockRequest);
  //   await userLogin(mockRequest, mockResponse);
  //   expect(mockResponse.status).toBeCalledWith(401);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     ok: true,
  //     msg: 'User Exists',
  //     data: {
  //       email: 'test@test.com',
  //     },
  //   });
  // });

  // it('login user with unregistered email', async () => {
  //   const mockRequest = {
  //     body: {
  //       email: 'nomail@test.com',
  //     },
  //   };
  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     send: jest.fn(),
  //     json: jest.fn(),
  //   };

  //   await userLogin(mockRequest, mockResponse);
  //   expect(mockResponse.status).toBeCalledWith(401);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     ok: false,
  //     msg: 'The email is not registered. Please sign up first.',
  //   });
  // });

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

  // it('get user by id', async () => {
  //   const mockRequest = {
  //     params: {
  //       id: user[0].id,
  //     },
  //   };
  //   console.log(mockRequest);
  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     send: jest.fn(),
  //     json: jest.fn(),
  //   };

  //   await getUserById(mockRequest, mockResponse);
  //   expect(mockResponse.json).toBeCalledWith({
  //     ok: true,
  //     msg: 'User Found.',
  //     data: expect.anything(),
  //   });
  // });

  // it('get user by random id', async () => {
  //   const mockRequest = {
  //     params: {
  //       id: '578df3efb61825131202a196',
  //     },
  //   };
  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     send: jest.fn(),
  //     json: jest.fn(),
  //   };

  //   await getUserById(mockRequest, mockResponse);
  //   expect(mockResponse.status).toBeCalledWith(401);
  //   expect(mockResponse.json).toBeCalledWith({
  //     ok: false,
  //     msg: 'User does not exist.',
  //   });
  // });
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

  it('update a campaign status', async () => {
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

  // mail send failed due to external service...
  // it('make a donation for a campaign', async () => {
  //   const mockRequest = {
  //     body: {
  //       campaignId: createdCampaign[0].id,
  //       transactionId: 'TrnsactionID',
  //       walletAddress: 'Wallet 1',
  //       isAnonymous: true,
  //       amount: 100,
  //     },
  //   };
  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     send: jest.fn(),
  //     json: jest.fn(),
  //   };

  //   await addDonation(mockRequest, mockResponse);

  //   expect(mockResponse.json).toBeCalledWith({
  //     ok: true,
  //     msg: 'Donation Added',
  //     data: expect.anything(),
  //   });
  // });
});
