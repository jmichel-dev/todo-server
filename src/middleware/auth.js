const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (request, response, next) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).send({ 
        error: 'You must be logged in' 
      });
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
      if (err) {
        return response.status(401).send({ 
          error: 'You must be logged in.'
        });
      }

      const { userId } = payload;

      const user = await User.findById(userId);

      if (!user) {
        return response.status(404).send({ 
          error: 'You are not authorized.'
        });
      }

      request.user = user;
      next();
    });
  } catch (err) {
    return response.status(402).send({ error: 'You must be logged in.' });
  }
};