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
    // Registre o @fastify/cors antes de outras coisas
    await this.server.register(fastifyCors, {
      origin: (
        origin: string | undefined,
        cb: (err: Error | null, allow: boolean) => void
      ) => {
        if (!origin || /localhost:3000/.test(origin)) {
          cb(null, true); // Permitir a origem
          return;
        }
        cb(new Error('Not allowed'), false); // Bloquear outras origens
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
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
