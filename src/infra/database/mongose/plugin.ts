import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose, { ConnectOptions } from 'mongoose';

async function mongooseConnector(fastify: FastifyInstance) {
  try {
    const mongoURL =
      'mongodb://mongo:e07be2c58d4d201d22eb@easypanel.conscientizar.online:27017/sistema-rachas?authSource=admin';
    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 30000,
    };

    await mongoose.connect(mongoURL, options);
    fastify.log.info('MongoDB connected');
  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    throw err;
  }
}

export default fp(mongooseConnector);
