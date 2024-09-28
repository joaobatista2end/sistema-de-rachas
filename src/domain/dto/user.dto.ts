export type CreateUserDto = {
  name: string;
  email: string;
  passwrod: string;
  confirm: string;
  photoUrl?: string;
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
};
