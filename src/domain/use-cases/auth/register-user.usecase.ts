import { UserModel } from '../../../infra/database/mongose/models/user.model';
import { UserMongoRespository } from '../../../infra/database/repositories/mongoose/user.respository';
import { UserRepository } from '../../../infra/database/repositories/user.repository';
import { CreateUserDto } from '../../dto/user.dto';
import { User } from '../../entities/user';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
export class RegisterUserUseCase {
  private static repository: UserRepository = new UserMongoRespository(
    UserModel
  );

  static async execute(payload: CreateUserDto): Promise<User | null> {
    const existsUser = await this.repository.findByEmail(payload.email);
    if (existsUser !== null) {
      throw new Error('O e-mail já foi cadastrado!');
    } else {
      const password = await bcrypt.hash(payload.password, SALT_ROUNDS);
      const user = await RegisterUserUseCase.repository.register({
        ...payload,
        password,
      });
      return user;
    }
  }
}
