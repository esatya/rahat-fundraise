const {
  connectDatabase,
  closeDatabase,
  clearDatabase,
  convertToObjectID,
} = require('../mongo');
const {
  registerUser,
  listUsers,
  addUser,
  getProfile,
} = require('../../controllers/User.controller');

describe('User Controller', () => {
  beforeAll(async () => {
    await connectDatabase();
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
    expect(mockResponse.json).toBeCalledWith({
      ok: true,
      msg: 'User Route Reached',
      data: [],
    });
  });

  it('add new user', async () => {
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

    await addUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      msg: 'New User added',
      data: expect.anything(),
    });
  });

  it('add new user with same email', async () => {
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

    await addUser(mockRequest, mockResponse);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'email already in use',
    });
  });

  it('add new user with same alias', async () => {
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
});
