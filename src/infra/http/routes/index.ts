import { FastifyInstance } from 'fastify';

import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/players', playerController.all.bind(playerController));
  fastify.get(
    '/match/amount-paid-players/:id',
    matchController.getAmountPaidPlayer.bind(matchController)
  );
};

export default routes;
