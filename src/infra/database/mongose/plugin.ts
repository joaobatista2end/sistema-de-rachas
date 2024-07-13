import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';
import { DB_URL } from '../../../environment';

async function mongooseConnector(fastify: FastifyInstance) {
  try {
    await mongoose.connect(DB_URL);
    fastify.log.info('MongoDB connected');
  } catch (err) {
    fastify.log.error(err);
  }
}

export default fp(mongooseConnector);
