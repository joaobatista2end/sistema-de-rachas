import z from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  DB_DRIVER: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_DATABASE: z.string(),
  DB_AUTH_SOURCE: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
});

export const env = envSchema.parse(process.env);