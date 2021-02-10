module.exports = {
  async register(request, response) {
    return response.send({ message: "Hello, Signup!"})
  },

  async login(request, response) {
    return response.send({ message: "Hello, Signin!"})
  }
}