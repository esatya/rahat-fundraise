import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';

import allRoute from './routes/allRoute';
import userRoute from './routes/User.route';
import campaignRoute from './routes/Campaign.route';
import donationRoute from './routes/Donation.route';

import { mongoURI, port } from './config/keys';

require('express-async-errors');

const app: express.Application = express();

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/ping', allRoute);
app.use('/api/user', userRoute);
app.use('/api/campaign', campaignRoute);
app.use('/api/donation', donationRoute);

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running on ${port}`));
