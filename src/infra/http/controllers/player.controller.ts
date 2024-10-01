import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterPlayerUseCase } from '../../../domain/use-cases/player/register-player.usecase';
import { CreatePlayerDto } from '../../../domain/dto/player.dto';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { PlayerPresenter } from '../../../application/presenters/player.presenter';

class PlayerController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const playerDto = req.body as CreatePlayerDto;
    const result = await RegisterPlayerUseCase.execute(playerDto);
    if (result) {
      res.status(HttpStatusCode.CREATED).send(PlayerPresenter(result));
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: 'Erro ao criar jogador',
      });
    }
  }
}

export default new PlayerController();
