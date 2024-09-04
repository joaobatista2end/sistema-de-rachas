import { uid } from 'uid';

export class User {
  id: string; // Pode ser gerado automaticamente pelo MongoDB
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): User {
    return new User( uid(), name, email, password );
  }
}
