import { FastifyReply, FastifyRequest } from 'fastify';

import { RegisterUserUseCase } from '../../../domain/use-cases/auth/register-user.usecase';
import { CreateUserDto } from '../../../domain/dto/user.dto';
import { UserPresenter } from '../../../application/presenters/user.presenter';

class AuthController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const user = await RegisterUserUseCase.execute(req.body as CreateUserDto);
    if (!user) return null;

    res.send({
      data: UserPresenter(user),
    });
  }
}

export default new AuthController();
