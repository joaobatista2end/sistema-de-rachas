import { FastifyReply, FastifyRequest } from 'fastify';

import { GetAmountPaidPlayerUseCase } from '../../../domain/use-cases/match/get-amount-paid-player.usecase';
import { RegisterMatchUseCase } from '../../../domain/use-cases/match/register-match.usecase';
import { UpdateMatchUseCase } from '../../../domain/use-cases/match/update-match.usecase';
import { FindMatchUseCase } from '../../../domain/use-cases/match/find-match.usecase';
import { CreateMatchDto } from '../../../domain/dto/match.dto';
import { MatchPresenter } from '../../../application/presenters/match.presenter';
import { FetchMatchUseCase } from '../../../domain/use-cases/match/fetch-match.usecase';
import { HttpStatusCode } from '../../../domain';
import { GenerateTeamsByPlayerStarsUseCase } from '../../../domain/use-cases/match/generate-teams.usecase';
import { RemoveMatchUseCase } from '../../../domain/use-cases/match/remove-match.usecase';
import { TeamPresenter } from '../../../application/presenters/team.presenter';
import { GetUserMatchesUseCase } from '../../../domain/use-cases/match/get-user-matches.usecase';

class MatchController {
  async all(req: FastifyRequest, res: FastifyReply) {
    const matchs = await FetchMatchUseCase.execute();
    res.send({
      data: matchs,
    });
  }
  async register(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;

    const result = await RegisterMatchUseCase.execute({
      ...(req.body as CreateMatchDto),
      user: user.id,
    });

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: MatchPresenter(result.value),
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

  async getUserMatches(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const result = await GetUserMatchesUseCase.execute(user.id, user.role);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.OK).send(result.value);
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const matchDto = req.body as Partial<CreateMatchDto>;
    const result = await UpdateMatchUseCase.execute(id, matchDto);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: MatchPresenter(result.value),
    });
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const result = await RemoveMatchUseCase.execute(req.params.id);
    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.OK).send(result.value);
  }

  async generateTeamsByPlayerStars(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const result = await GenerateTeamsByPlayerStarsUseCase.execute(id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: result.value.map((team) => TeamPresenter(team)),
    });
  }
}

export default new MatchController();
