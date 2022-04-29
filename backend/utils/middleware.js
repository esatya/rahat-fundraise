/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.headers.token, process.env.SECRET);
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id);

      req.user = user;
    }
  } catch (error) {
    res.status(401).send({ ok: false, msg: 'Invalid token.' });
  }

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
