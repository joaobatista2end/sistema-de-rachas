import fastify, { FastifyReply, FastifyRequest } from 'fastify';

import { RegisterUserUseCase } from '../../../domain/use-cases/auth/register-user.usecase';
import { CreateUserDto, LoginDto } from '../../../domain/dto/user.dto';
import { UserPresenter } from '../../../application/presenters/user.presenter';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { AutenticateUserUsecases } from '../../../domain/use-cases/auth/authenticate-user.usecase';

class AuthController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const result = await RegisterUserUseCase.execute(req.body as CreateUserDto);
    if (result.isLeft()) {
      res.status(result.value.code).send({
        message: result.value.message,
      });
    } else if (result.isRight() && result?.value) {
      res.send(UserPresenter(result.value));
    }
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    const result = await AutenticateUserUsecases.execute(req.body as LoginDto);

    if (result.isLeft()) {
      res.status(result.value.code).send({
        message: result.value.message,
      });
    } else {
      res.status(HttpStatusCode.OK).send({ token: result.value });
    }
  }
}

export default new AuthController();
