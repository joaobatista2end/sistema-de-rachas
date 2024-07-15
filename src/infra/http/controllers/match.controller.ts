import { FastifyReply, FastifyRequest } from 'fastify';

import { GetAmountPaidPlayerUseCase } from '../../../domain/use-cases/match/get-amount-paid-player.usecase';
import { RegisterMatchUseCase } from '../../../domain/use-cases/match/register-match.usecase';
import { MatchDto } from '../../database/mongose/models/match.model';

class MatchController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const registred = RegisterMatchUseCase.execute(req.body as MatchDto);
    res.send({
      data: registred,
    });
  }

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
