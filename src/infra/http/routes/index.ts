import { FastifyInstance, FastifyReply } from 'fastify';

import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';
import soccerFieldController from '../controllers/soccer-field.controller';
import authController from '../controllers/auth.controller';
import {
  loginSwaggerSchema,
  registerSwaggerSchema,
} from '../swagger/auth.schema';
import { createPlayerSchema } from '../swagger/player.schema';
const routes = async (fastify: FastifyInstance) => {
  // Auth Routes
  fastify.post(
    '/auth/register',
    { schema: registerSwaggerSchema },
    authController.register.bind(authController)
  );
  fastify.post(
    '/auth/login',
    { schema: loginSwaggerSchema },
    authController.login.bind(authController)
  );

  // Players
  fastify.post(
    '/player',
    { schema: createPlayerSchema },
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

  // Soccer Field
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
