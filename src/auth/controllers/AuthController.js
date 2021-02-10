const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(request, response) {
    try {
      const { firstName, lastName, email, password } = request.body;

      const user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      await user.save();

      return response.send({ 
        message: "Your account has been created succesfully." 
      });
    } catch(err) {
      return response.status(422).send({ 
        message: "Failed to create your account." 
      });
    }
  },

  async login(request, response) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response.status(442).send({ error: 'Invalid email or password' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return response.status(404).send({ error: 'Invalid password or email' });
      }

      try {
        await user.comparePassword(password);

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

        return response.send({ token });

      } catch (err) {
        return response.status(401).send({ error: 'Invalid password or email' })
      }

    } catch (err) {
      return response.status(422).send({ message: "Failed to log in." });
    }
  }
}