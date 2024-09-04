import { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterUserUseCase } from '../../../domain/use-cases/authenticate/register-user.usecase';
import { UserRepository } from '../../../infra/database/repositories/user.repository'; // Certifique-se de que o caminho está correto

// Definindo a interface para o corpo da requisição
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

class RegisterController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor() {
    // Instanciando o repositório de usuários e o caso de uso
    const userRepository = new UserRepository(); // Certifique-se de que o repositório está implementado corretamente
    this.registerUserUseCase = new RegisterUserUseCase(userRepository);
  }

  async handle(request: FastifyRequest<{ Body: RegisterRequestBody }>, reply: FastifyReply) {
    try {
      const { name, email, password } = request.body;
      const user = await this.registerUserUseCase.execute({ name, email, password });
      reply.status(201).send(user);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

// Exportando uma nova instância do controlador
export default new RegisterController();