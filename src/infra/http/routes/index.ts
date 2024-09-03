import { FastifyInstance, FastifyReply } from 'fastify';

import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';
import soccerFieldController from '../controllers/soccer-field.controller';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/', (req, reply: FastifyReply) => {
    reply.send({
      message: 'API versão 1',
    });
  });
  fastify.post('/player', playerController.register.bind(playerController));

  // Match
  fastify.post('/match', matchController.register.bind(matchController));
  fastify.get('/match', matchController.all.bind(matchController));
  fastify.put('/match/:id', matchController.update.bind(matchController));
  fastify.get('/match/:id', matchController.findById.bind(matchController));

  fastify.get(
    '/match/:id/amount-paid-players',
    matchController.getAmountPaidPlayer.bind(matchController)
  );

  fastify.post(
    '/soccer-field',
    soccerFieldController.register.bind(soccerFieldController)
  );
  fastify.get(
    '/soccer-field',
    soccerFieldController.all.bind(soccerFieldController)
  );
  fastify.get(
    '/soccer-field/:id',
    soccerFieldController.availableTimes.bind(soccerFieldController)
  );
};

export default routes;
