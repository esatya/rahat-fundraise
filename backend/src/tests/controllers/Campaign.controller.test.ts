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
});
