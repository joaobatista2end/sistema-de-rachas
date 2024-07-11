import { uid } from "uid";
import { Player } from "./player";

export type TeamParams = {
  name: string;
  players: Array<Player>;
};

export class Team {
  id: string;
  name: string;
  players: Array<Player>;

  constructor(params: TeamParams) {
    this.id = uid();
    this.name = params.name;
    this.players = params.players;
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  removePlayer(playerId: string): void {
    this.players = this.players.filter(player => player.id !== playerId);
  }


  editPlayer(playerId: string, newDetails: Partial<Player>): void {
    const player = this.players.find(player => player.id === playerId);
    if (player) {
      if (newDetails.name !== undefined) player.name = newDetails.name;
      if (newDetails.stars !== undefined) player.stars = newDetails.stars;
    }
  }

  getTeamInfo(): { id: string; name: string; players: Player[] } {
    return {
      id: this.id,
      name: this.name,
      players: this.players,
    };
  }
}
