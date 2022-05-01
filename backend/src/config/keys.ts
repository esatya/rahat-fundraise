import dotenv from 'dotenv';

dotenv.config();

export const secret = process.env.SECRET!;
export const port = process.env.PORT || '3001';
export const mongoURI = process.env.MONGODB_URL!;