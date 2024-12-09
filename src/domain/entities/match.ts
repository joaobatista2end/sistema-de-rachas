import { Player } from './player';
import { Schedule } from './schedule';
import { SoccerField } from './soccer-field';
import { Team } from './team';
import { User } from './user';

export type MatchParams = {
  id: string;
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerField;
  schedules: Schedule[];
  players?: Array<Player>;
  teams?: Array<Team>;
  user: User;
};

export class Match {
  id: string;
  name: string;
  thumb: string;
  players: Array<Player>;
  schedules: Schedule[];
  paymentListPlayers: Array<string>;
  soccerField: SoccerField;
  teams?: Array<Team>;
  description: string;
  user: User;

  public constructor(params: MatchParams) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.players = params?.players || [];
    this.soccerField = params.soccerField;
    this.schedules = params.schedules;
    this.thumb = params.thumb;
    this.teams = params?.teams ?? [];
    this.paymentListPlayers = [];
    this.user = params.user;
  }

  public get paymentPlayers(): Array<Player> {
    return this.players.filter((player) => {
      return this.paymentListPlayers.includes(player.id);
    });
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(playerID: string) {
    const indexPlayer = this.players.findIndex(
      (player) => player.id === playerID
    );
    if (indexPlayer !== -1) {
      this.players.splice(indexPlayer, 1);
    }
  }

  public getPlayer(playerID: string): Player | undefined {
    return this.players.find((playerItem) => playerItem.id === playerID);
  }

  public pay(playerID: string) {
    this.paymentListPlayers.push(playerID);
  }

  public get amountToBePaidPerPlayer(): number {
    return (
      (this.schedule.totalHours * this.soccerField.rentalValue) /
      this.players.length
    );
  }
}
