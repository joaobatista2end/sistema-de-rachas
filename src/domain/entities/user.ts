import { UserRoleEnum } from '../enums';

export type UserParams = {
  id: string;
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  role: UserRoleEnum;
  isMatchAdmin: boolean;
};

export class User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  role: UserRoleEnum;
  password: string;
  isMatchAdmin: boolean;

  constructor(params: UserParams) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.photoUrl = params.photoUrl;
    this.role = params.role;
    this.isMatchAdmin = params.isMatchAdmin;
  }
}
