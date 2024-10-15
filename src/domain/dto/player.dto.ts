export type PlayerDto = {
  id: string;
  name: string;
  stars: number;
};

export type CreatePlayerDto = {
  name: string;
  stars: number;
  token: string;
};
