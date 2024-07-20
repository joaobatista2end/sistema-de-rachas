import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/register-soccer-field.usecase';
import { CreateSoccerFieldDto } from '../../../domain/dto/soccer-field.dto';
import { SoccerFieldPresenter } from '../../../application/presenters/soccer-field.presenter';

class SoccerFieldController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const soccerFieldDto = req.body as CreateSoccerFieldDto;
    const soccerField = await RegisterSoccerFieldUseCase.execute(
      soccerFieldDto
    );

    res.send({
      data: soccerField !== null ? SoccerFieldPresenter(soccerField) : {},
    });
  }
}

export default new SoccerFieldController();
