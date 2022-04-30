// Import the packages
import express from 'express';
require('express-async-errors');

import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';


dotenv.config()

// Create an instance for express
const app = express();

// Import routes
import allRoute from './routes/allRoute';
import userRoute from './routes/User.route';
import campaignRoute from './routes/Campaign.route';
import donationRoute from './routes/Donation.route';

// Import Middlewares

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

app.use(cors());
app.use(express.json());
app.set('view engine', 'jade');
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));

// Apply the routes of /api/cpontent/work-experience
app.use('/api/ping', allRoute);
app.use('/api/user', userRoute);
app.use('/api/campaign', campaignRoute);
app.use('/api/donation', donationRoute);
app.use('*', (req, res) =>
  res.sendFile(path.join(`${__dirname}/build`, 'index.html')),
);

// Get the mongoURI for database
const db = require('./config/keys').mongoURI;

// Connecting with database
mongoose
  .connect(db, { useNewUrlParser: true })
  // If all run ok, console log the message
  .then(() => console.log('MongoDB connected'))
  // For console log any error
  .catch((err) => console.log(err));

// Port declaration
const port = process.env.PORT || 3001;

// Init the express.js server
app.listen(port, () => console.log(`Server running on ${port}`));
