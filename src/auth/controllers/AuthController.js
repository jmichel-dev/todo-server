const mongoose = require('mongoose');
const User = mongoose.model('User');

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

      return response.send({ message: "Log in succesfully."});
    } catch (err) {
      return response.status(422).send({ message: "Failed to log in." });
    }
  }
}