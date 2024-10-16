import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/register-soccer-field.usecase';
import { CreateSoccerFieldDto } from '../../../domain/dto/soccer-field.dto';
import { SoccerFieldPresenter } from '../../../application/presenters/soccer-field.presenter';
import { FetchSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/fetch-soccer-field.usecase';
import { GetSoccerFieldAvailableTimes } from '../../../domain/use-cases/soccer-field/get-soccer-field-available-times';
import { AvailableTimesPresenter } from '../../../application/presenters/available-times.presenter';
import { RemoveSoccerFieldUseCasee } from '../../../domain/use-cases/soccer-field/remove-soccer-field.usecase';

class SoccerFieldController {
  async all(req: FastifyRequest, res: FastifyReply) {
    const soccerFields = await FetchSoccerFieldUseCase.execute();
    res.send({
      soccerFields,
    });
  }
  async register(req: FastifyRequest, res: FastifyReply) {
    const soccerFieldDto = req.body as CreateSoccerFieldDto;
    const soccerField = await RegisterSoccerFieldUseCase.execute(
      soccerFieldDto
    );

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

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    console.log('ID recebido para deleção:', id);
    try {
      await RemoveSoccerFieldUseCasee.execute(id);
      return reply.code(200).send({ message: 'Campo deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar campo:', error); // Log para capturar o erro
      return reply.send({ error: 'Erro ao deletar campo de carai' });
    }
  }
}

export default new SoccerFieldController();
