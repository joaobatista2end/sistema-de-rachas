import { FastifyReply, FastifyRequest } from 'fastify';

import { GetAmountPaidPlayerUseCase } from '../../../domain/use-cases/match/get-amount-paid-player.usecase';
import { RegisterMatchUseCase } from '../../../domain/use-cases/match/register-match.usecase';
import { MatchDto } from '../../database/mongose/models/match.model';
import { UpdateMatchUseCase } from '../../../domain/use-cases/match/update-match.usecase';
import { FindMatchUseCase } from '../../../domain/use-cases/match/find-match.usecase';

class MatchController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const registred = await RegisterMatchUseCase.execute(req.body as MatchDto);
    res.send({
      data: registred,
    });
  }

  async getAmountPaidPlayer(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const total = GetAmountPaidPlayerUseCase.execute(id);
    res.send({
      data: {
        total,
      },
    });
  }

  async findById(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const match = await FindMatchUseCase.execute(id);

    res.send({
      data: match,
    });
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const matchDto = req.body as Partial<MatchDto>;
    const updated = UpdateMatchUseCase.execute(id, matchDto);

    res.send({
      data: updated,
    });
  }
}

export default new MatchController();
