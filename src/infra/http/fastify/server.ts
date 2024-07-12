import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

import routes from '../routes';

class FastifyServer {
  server: FastifyInstance;

  constructor() {
    this.server = Fastify({});
    this.server.register(routes);
  }

  async start() {
    try {
      await this.server.listen({ port: 3000 });
      console.log('Servidor iniciado com sucesso!');
    } catch (err) {
      console.error(err);
      this.server.log.error(err);
      process.exit(1);
    }
  }
}

export default new FastifyServer();
