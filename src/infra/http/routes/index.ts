import { FastifyInstance } from 'fastify';

import loginController from '../controllers/login.controller';
import registerController from '../controllers/register.controller';
import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';
import soccerFieldController from '../controllers/soccer-field.controller';

const routes = async (fastify: FastifyInstance) => {
    // Player
    fastify.post('/player', playerController.register.bind(playerController));

    // Match
    fastify.post('/match', matchController.register.bind(matchController));
    fastify.get('/match', matchController.all.bind(matchController));
    fastify.put('/match/:id', matchController.update.bind(matchController));
    fastify.get('/match/:id', matchController.findById.bind(matchController));
    fastify.get('/match/:id/amount-paid-players', matchController.getAmountPaidPlayer.bind(matchController));
  
    // Soccer Field
    fastify.post('/soccer-field', soccerFieldController.register.bind(soccerFieldController));
    fastify.get('/soccer-field', soccerFieldController.all.bind(soccerFieldController));
    fastify.get('/soccer-field/:id', soccerFieldController.availableTimes.bind(soccerFieldController));
  
    // Authentication
    fastify.post('/login', loginController.handle.bind(loginController));
    fastify.post('/register', registerController.handle.bind(registerController));
  
  
};

export default routes;
