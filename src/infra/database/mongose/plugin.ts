import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose, { ConnectOptions } from 'mongoose';

async function mongooseConnector(fastify: FastifyInstance) {
  try {
    const mongoURL =
      'mongodb://mongo:e07be2c58d4d201d22eb@rachas_db-rachas:27017/sistema-rachas?authSource=admin';
    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 30000, // 30 segundos
    };

    await mongoose.connect(mongoURL, options);
    fastify.log.info('MongoDB connected');
  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    throw err; // Lançar erro para que o Fastify saiba que a inicialização falhou
  }
}

export default fp(mongooseConnector);
