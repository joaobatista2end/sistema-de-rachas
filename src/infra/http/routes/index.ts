import { FastifyInstance } from 'fastify';

import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';
import soccerFieldController from '../controllers/soccer-field.controller';

const routes = async (fastify: FastifyInstance) => {
  fastify.post('/players', playerController.register.bind(playerController));

  // Match
  fastify.post('/match', matchController.register.bind(matchController));

  fastify.get(
    '/match/amount-paid-players/:id',
    matchController.getAmountPaidPlayer.bind(matchController)
  );

  fastify.post('/soccer-field', soccerFieldController.register.bind(soccerFieldController));
};

export default routes;
