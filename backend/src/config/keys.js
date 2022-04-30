require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGODB_URL,
  secret: process.env.SECRET,
};
