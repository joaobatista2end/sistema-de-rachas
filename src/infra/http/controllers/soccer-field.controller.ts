import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/register-soccer-field.usecase';
import { SoccerFieldDto } from '../../database/mongose/models/soccer-field.model';

class SoccerFieldController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const soccerFieldDto = req.body as SoccerFieldDto;
    const soccerField = await RegisterSoccerFieldUseCase.execute(soccerFieldDto);

    res.send({
      data: soccerField,
    });
  }
}

export default new SoccerFieldController();
