import { FastifyInstance } from 'fastify';

import playerController from '../controllers/player.controller';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/players', playerController.all.bind(playerController));
};

export default routes;
