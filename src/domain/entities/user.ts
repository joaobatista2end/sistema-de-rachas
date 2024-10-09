export type UserParams = {
  id: string;
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  userType: string;
};

export class User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  password: string;
  userType: string;

  constructor(params: UserParams) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.photoUrl = params.photoUrl;
    this.userType = params.userType;
  }
}
