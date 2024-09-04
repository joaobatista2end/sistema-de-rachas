import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import UserModel from '../mongose/models/user.model'; // Supondo que você tenha um modelo Mongoose definido

export class UserRepository implements IUserRepository {
  private users: User[] = []; // Simulação de armazenamento em memória

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
  async create(userData: { name: string; email: string; password: string }) {
    const user = new UserModel(userData);
    return await user.save();
  }
  async save(user: User): Promise<void> {
    this.users.push(user); // Adiciona o usuário à lista
  }
}
