import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterPlayerUseCase } from '../../../domain/use-cases/player/register-player.usecase';
import { CreatePlayerDto } from '../../../domain/dto/player.dto';

class PlayerController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const playerDto = req.body as CreatePlayerDto;
    const player = await RegisterPlayerUseCase.execute(playerDto);

    res.send({
      data: player,
    });
  }
}

export default new PlayerController();
