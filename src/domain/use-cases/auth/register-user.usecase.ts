import { UserModel } from '../../../infra/database/mongose/models/user.model';
import { UserMongoRespository } from '../../../infra/database/repositories/mongoose/user.respository';
import { UserRepository } from '../../../infra/database/repositories/user.repository';
import { CreateUserDto } from '../../dto/user.dto';
import { User } from '../../entities/user';

export class RegisterUserUseCase {
  private static repository: UserRepository = new UserMongoRespository(
    UserModel
  );

  static async execute(payload: CreateUserDto): Promise<User | null> {
    const user = await RegisterUserUseCase.repository.register(payload);
    return user;
  }
}
