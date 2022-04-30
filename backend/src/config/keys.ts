import dotenv from 'dotenv';

dotenv.config()

export const secret = process.env.SECRET
export const mongoURI = process.env.MONGODB_URL

