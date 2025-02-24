import { UserModel } from '../../../infra/database/mongose/models/user.model';
import { UserMongoRespository } from '../../../infra/database/repositories/mongoose/user.respository';
import { UserRepository } from '../../../infra/database/repositories/user.repository';
import { CreateUserDto } from '../../dto/user.dto';
import { User } from '../../entities/user';
import { Either, left, right } from '../../utils/either';
import { HttpStatusCode } from '../../enums/http-status-code';
import { HttpError } from '../../errors/http.error';
import { crypt } from '../../utils/crypt';

export class UpdateUserUseCase {
  private static repository: UserRepository = new UserMongoRespository(
    UserModel
  );

  static async execute(
    userId: string,
    payload: Partial<CreateUserDto>
  ): Promise<Either<HttpError, User>> {
    const user = await this.repository.findById(userId);

    if (!user) {
      return left(
        new HttpError(HttpStatusCode.NOT_FOUND, 'Usuário não encontrado')
      );
    }

    // Se houver uma nova senha, criptografa ela
    if (payload.password) {
      payload.password = await crypt.hash(payload.password);
    }

    const updatedUser = await this.repository.update(userId, payload);

    if (!updatedUser) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Falha ao atualizar usuário'
        )
      );
    }

    return right(updatedUser);
  }
} 