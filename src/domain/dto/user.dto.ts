export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
};
