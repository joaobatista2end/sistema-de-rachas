import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors'; // Importe o pacote correto
import mongoosePlugin from '../../database/mongose/plugin';
import routes from '../routes';

class FastifyServer {
  server: FastifyInstance;

  constructor() {
    this.server = Fastify({ logger: true });
    this.boot();
  }

  async boot() {
    await this.server.register(fastifyCors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    await this.server.register(routes);
    await this.server.register(mongoosePlugin, { timeout: 30000 });
  }

  async start() {
    try {
      await this.server.listen({ port: 8000, host: '0.0.0.0' });
      console.log('Servidor iniciado com sucesso!');
    } catch (err) {
      console.error(err);
      this.server.log.error(err);
      process.exit(1);
    }
  }
}

export default new FastifyServer();
