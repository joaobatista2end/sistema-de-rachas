import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';
import soccerFieldController from '../controllers/soccer-field.controller';
import authController from '../controllers/auth.controller';
import {
  loginSwaggerSchema,
  registerSwaggerSchema,
} from '../swagger/auth.schema';
import { createPlayerSchema } from '../swagger/player.schema';
import { verifyJwt } from '../middlewares/Authenticated';

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
    { onRequest: [verifyJwt], schema: createPlayerSchema },
    playerController.register.bind(playerController)
  );

  // Match
  fastify.post(
    '/match',
    { onRequest: [verifyJwt] },
    matchController.register.bind(matchController)
  );
  fastify.get(
    '/match',
    { onRequest: [verifyJwt] },
    matchController.all.bind(matchController)
  );
  fastify.put<{
    Params: { id: string };
  }>(
    '/match/:id',
    { onRequest: [verifyJwt] },
    matchController.update.bind(matchController)
  );
  fastify.get<{
    Params: { id: string };
  }>(
    '/match/:id',
    { onRequest: [verifyJwt] },
    matchController.findById.bind(matchController)
  );
  fastify.get<{
    Params: { id: string };
  }>(
    '/match/:id/amount-paid-players',
    { onRequest: [verifyJwt] },
    matchController.getAmountPaidPlayer.bind(matchController)
  );

  // Soccer Field
  fastify.post(
    '/soccer-field',
    { onRequest: [verifyJwt] },
    soccerFieldController.register.bind(soccerFieldController)
  );
  fastify.get(
    '/soccer-field',
    { onRequest: [verifyJwt] },
    soccerFieldController.all.bind(soccerFieldController)
  );
  fastify.get<{
    Params: { id: string };
    Querystring: { month: number | undefined };
  }>(
    '/soccer-field/:id',
    { onRequest: [verifyJwt] },
    soccerFieldController.availableTimes.bind(soccerFieldController)
  );
};

export default routes;
