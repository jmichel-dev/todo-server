require('dotenv').config();
require('./models/User');

const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");

const auth = require("./auth/routes");

const app = express();

// DB CONNECTION
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance.")
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect into mongo instance.", err);
});

// CONFIGURATIONS
app.use(express.json());
app.use(helmet());

// ROUTES
// Auth
app.use('/auth', auth);

// PORT
app.listen(3000, () => {
  console.log('Server running on port 3000.')
});