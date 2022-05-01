import dotenv from 'dotenv';

dotenv.config();

export const secret = process.env.SECRET || 'secret';
export const port = process.env.PORT || '3001';
export const mongoURI =
  process.env.MONGODB_URL ||
  'mongodb+srv://<username>:<password>@cluster0.nyqib.mongodb.net/rahat-fundraiser?retryWrites=true&w=majority';
