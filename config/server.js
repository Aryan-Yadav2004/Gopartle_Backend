import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
