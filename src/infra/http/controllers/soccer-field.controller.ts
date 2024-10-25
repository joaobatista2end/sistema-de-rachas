import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/register-soccer-field.usecase';
import { CreateSoccerFieldDto } from '../../../domain/dto/soccer-field.dto';
import {
  ArraySoccerFieldPresenter,
  SoccerFieldPresenter,
} from '../../../application/presenters/soccer-field.presenter';
import { FetchSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/fetch-soccer-field.usecase';
import { GetSoccerFieldAvailableTimes } from '../../../domain/use-cases/soccer-field/get-soccer-field-available-times';
import { AvailableTimesPresenter } from '../../../application/presenters/available-times.presenter';
import { HttpStatusCode } from '../../../domain';
import { FetchSoccerFieldByUserUseCase } from '../../../domain/use-cases/soccer-field/fetch-soccer-field-by-user';

class SoccerFieldController {
  async all(req: FastifyRequest, res: FastifyReply) {
    const result = await FetchSoccerFieldUseCase.execute();

    if (result.isRight()) {
      res
        .status(HttpStatusCode.OK)
        .send(ArraySoccerFieldPresenter(result.value));
    } else {
      res.status(result.value.code).send(result.value.message);
    }
  }

  async allByUser(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const result = await FetchSoccerFieldByUserUseCase.execute(user.id);

    if (result.isRight()) {
      res
        .status(HttpStatusCode.OK)
        .send(ArraySoccerFieldPresenter(result.value));
    } else {
      res.status(result.value.code).send(result.value.message);
    }
  }
  async register(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const soccerFieldDto = req.body as CreateSoccerFieldDto;
    const soccerField = await RegisterSoccerFieldUseCase.execute({
      ...soccerFieldDto,
      user: user.id,
    });

    res.send({
      data: soccerField !== null ? SoccerFieldPresenter(soccerField) : {},
    });
  }
  async availableTimes(
    req: FastifyRequest<{
      Params: { id: string };
      Querystring: { month?: number };
    }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const { month } = req.query;

    const availableTimes = await GetSoccerFieldAvailableTimes.execute(
      id,
      month
    );

    return {
      data: availableTimes ? AvailableTimesPresenter(availableTimes) : null,
    };
  }
}

export default new SoccerFieldController();
