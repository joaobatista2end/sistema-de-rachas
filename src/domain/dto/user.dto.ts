export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
};
