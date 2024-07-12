import { FastifyReply, FastifyRequest } from 'fastify';

import {
    GetAmountPaidPlayerUseCase
} from '../../../domain/use-cases/match/get-amount-paid-player.usecase';

class MatchController {
  async getAmountPaidPlayer(req: FastifyRequest, res: FastifyReply) {
    const total = GetAmountPaidPlayerUseCase.execute('123123');
    res.send({
      data: {
        total,
      },
    });
  }
}

export default new MatchController();
