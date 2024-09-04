import { UserRepository } from '../../../infra/database/repositories/user.repository';

interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    if (!userRepository) {
      throw new Error('UserRepository is required');
    }
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }: RegisterUserDTO) {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    console.log('Executing RegisterUserUseCase with:', { name, email, password });

    try {
      // Verifica se o usuário já existe
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Cria um novo usuário
      const user = await this.userRepository.create({ name, email, password });
      console.log('User created successfully:', user);
      return user;
    } catch (error) {
      console.error('Error in RegisterUserUseCase:', error);
      throw error;
    }
  }
}
