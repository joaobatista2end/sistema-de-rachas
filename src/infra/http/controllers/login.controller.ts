import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthenticateUserUseCase } from '../../../domain/use-cases/authenticate/authenticate-user.usecase';
import { UserRepository } from '../../../infra/database/repositories/user.repository'; // Certifique-se de que o caminho está correto

// Definindo a interface para o corpo da requisição
interface LoginRequestBody {
  email: string;
  password: string;
}

class LoginController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: LoginRequestBody }>,
    reply: FastifyReply
  ) {
    try {
      // Extraindo email e password do corpo da requisição
      const { email, password } = request.body;
      const { token } = await this.authenticateUserUseCase.execute({
        email,
        password,
      });
      reply.send({ token });
    } catch (error) {
      // Verificando se o erro é uma instância de Error
      if (error instanceof Error) {
        return reply.status(401).send({ message: error.message });
      }
      return reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

// Instanciando o controlador com o repositório de usuários
export default new LoginController(
  new AuthenticateUserUseCase(new UserRepository())
);
