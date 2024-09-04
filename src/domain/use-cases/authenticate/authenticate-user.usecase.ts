import { IUserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { generateToken } from '../../../utils/token'; // Importar a função generateToken

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    return { token: generateToken(user) }; // Gerar o token usando a função implementada
  }
}