import { UserDto } from '../../domain/dto/user.dto';
import { User } from '../../domain/entities/user';

export const UserPresenter = (user: User): UserDto => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    photoUrl: user.photoUrl,
  };
};
