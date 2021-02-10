const express = require("express");

const routes = express.Router();

routes.post('/signup', (req, res) => {
  return res.send("Signup Method");
})

module.exports = routes;