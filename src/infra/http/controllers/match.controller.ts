import { FastifyReply, FastifyRequest } from 'fastify';

import { GetAmountPaidPlayerUseCase } from '../../../domain/use-cases/match/get-amount-paid-player.usecase';
import { RegisterMatchUseCase } from '../../../domain/use-cases/match/register-match.usecase';
import { UpdateMatchUseCase } from '../../../domain/use-cases/match/update-match.usecase';
import { FindMatchUseCase } from '../../../domain/use-cases/match/find-match.usecase';
import { CreateMatchDto } from '../../../domain/dto/match.dto';
import { MatchPresenter } from '../../../application/presenters/match.presenter';
import { FetchMatchUseCase } from '../../../domain/use-cases/match/fetch-match.usecase';

class MatchController {
  async all(req: FastifyRequest, res: FastifyReply) {
    const matchs = await FetchMatchUseCase.execute();
    res.send({
      data: matchs,
    });
  }
  async register(req: FastifyRequest, res: FastifyReply) {
    console.log('Request body:', req.body); // Aqui você verá os dados recebidos
    const match = await RegisterMatchUseCase.execute(
      req.body as CreateMatchDto
    );

    res.send({
      data: MatchPresenter(match),
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
      data: MatchPresenter(match),
    });
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const matchDto = req.body as Partial<CreateMatchDto>;
    const updated = UpdateMatchUseCase.execute(id, matchDto);

    res.send({
      data: updated,
    });
  }
}

export default new MatchController();
