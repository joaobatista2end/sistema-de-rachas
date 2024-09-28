import { FastifyReply, FastifyRequest } from 'fastify';

import { RegisterUserUseCase } from '../../../domain/use-cases/auth/register-user.usecase';
import { CreateUserDto } from '../../../domain/dto/user.dto';
import { UserPresenter } from '../../../application/presenters/user.presenter';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';

class AuthController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const result = await RegisterUserUseCase.execute(req.body as CreateUserDto);
    if (result.isLeft()) {
      res.status(result.value.code).send({
        message: result.value.message,
      });
    } else if (result.value) {
      res.send({
        user: UserPresenter(result.value),
      });
    }
  }
}

export default new AuthController();
