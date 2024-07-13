import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterPlayerUseCase } from '../../../domain/use-cases/player/register-player.usecase';
import { PlayerDto } from '../../database/mongose/models/player.model';

class PlayerController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const playerDto = req.body as PlayerDto;
    const player = await RegisterPlayerUseCase.execute(playerDto);

    res.send({
      data: player,
    });
  }
}

export default new PlayerController();
