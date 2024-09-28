import { FastifyInstance, FastifyReply } from 'fastify';

import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';
import soccerFieldController from '../controllers/soccer-field.controller';

const routes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/player',
    {
      schema: {
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              hello: { type: 'string' },
            },
          },
          default: {
            description: 'Default response',
            type: 'object',
            properties: {
              foo: { type: 'string' },
            },
          },
        },
      },
    },
    playerController.register.bind(playerController)
  );

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
