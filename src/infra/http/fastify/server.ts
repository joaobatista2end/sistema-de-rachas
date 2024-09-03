import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import cors from '@fastify/cors';
import mongoosePlugin from '../../database/mongose/plugin';
import routes from '../routes';

class FastifyServer {
  server: FastifyInstance;

  constructor() {
    this.server = Fastify({ logger: true });
    this.server.register(routes);
    this.server.register(mongoosePlugin, { timeout: 30000 });
    this.server.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });
  }

  async start() {
    try {
      await this.server.listen({ port: 8000 });
      console.log('Servidor iniciado com sucesso!');
    } catch (err) {
      console.error(err);
      this.server.log.error(err);
      process.exit(1);
    }
  }
}

export default new FastifyServer();
