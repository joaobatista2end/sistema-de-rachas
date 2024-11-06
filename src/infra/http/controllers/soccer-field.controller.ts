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
import { RemoveSoccerFieldUsecase } from '../../../domain/use-cases/soccer-field/remove-soccer-field.usecase';

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
    const result = await RegisterSoccerFieldUseCase.execute({
      ...soccerFieldDto,
      user: user.id,
    });

    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.CREATED).send(SoccerFieldPresenter(result.value));
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const result = await RemoveSoccerFieldUsecase.execute(req.params.id);
    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.OK).send(result.value);
  }

  async availableTimes(
    req: FastifyRequest<{
      Params: { id: string };
      Querystring: { day?: string };
    }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const { day } = req.query;

    const result = await GetSoccerFieldAvailableTimes.execute(id, day);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value);
    }

    res.status(HttpStatusCode.OK).send({
      data: result.value,
    });
  }
}

export default new SoccerFieldController();
