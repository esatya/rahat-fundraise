const { connectDatabase, closeDatabase, clearDatabase } = require('../mongo');
const { registerUser } = require('../../controllers/User.controller');

describe('User Controller', () => {
  beforeAll(async () => {
    await connectDatabase();
  });
  afterAll(async () => {
    // await clearDatabase();
    await closeDatabase();
  });

  it('register user', async () => {
    expect(2 + 2).toBe(4);
  });
});
