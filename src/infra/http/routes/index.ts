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

  fastify.get(
    '/auth/me',
    {
      onRequest: [fastify.authenticate],
    },
    authController.me.bind(authController)
  );

  // Players
  fastify.post(
    '/player',
    { schema: createPlayerSchema, onRequest: [fastify.authenticate] },
    playerController.register.bind(playerController)
  );

  // Match
  fastify.post(
    '/match',
    { onRequest: [fastify.authenticate] },
    matchController.register.bind(matchController)
  );
  fastify.get(
    '/match',
    { onRequest: [fastify.authenticate] },
    matchController.all.bind(matchController)
  );
  fastify.put<{ Params: { id: string } }>(
    '/match/:id',
    { onRequest: [fastify.authenticate] },
    matchController.update.bind(matchController)
  );
  fastify.get<{ Params: { id: string } }>(
    '/match/:id',
    { onRequest: [fastify.authenticate] },
    matchController.findById.bind(matchController)
  );
  fastify.get<{ Params: { id: string } }>(
    '/match/:id/amount-paid-players',
    { onRequest: [fastify.authenticate] },
    matchController.getAmountPaidPlayer.bind(matchController)
  );

  // Soccer Field
  fastify.post(
    '/soccer-field',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.register.bind(soccerFieldController)
  );
  fastify.get(
    '/soccer-field',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.all.bind(soccerFieldController)
  );
  fastify.get(
    '/soccer-field/by-user',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.allByUser.bind(soccerFieldController)
  );
  fastify.get<{ Params: { id: string }; Querystring: { month: number } }>(
    '/soccer-field/:id',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.availableTimes.bind(soccerFieldController)
  );
};

export default routes;
