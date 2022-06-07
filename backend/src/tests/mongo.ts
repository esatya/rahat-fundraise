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

  convertToObjectID(id: string) {
    return mongoose.Types.ObjectId(id);
  },
};
