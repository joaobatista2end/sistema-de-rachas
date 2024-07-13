import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const PORT = process.env.PORT || 3000;
export const DB_URL =
  process.env.DB_URL ||
  'mongodb://root:d192jd912312dj912@mongo:27017/soccer-match';
