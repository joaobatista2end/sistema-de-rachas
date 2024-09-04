import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET não está definido. Verifique seu arquivo .env.');
}

export const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });
};