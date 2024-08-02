import { uid } from 'uid';

import { Player } from './player';
import { Schedule } from './schedule';
import { SoccerField } from './soccer-field';
import { Team } from './team';

export type MatchParams = {
  id: string;
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerField;
  schedule: Schedule;
  players?: Array<Player>;
};

export class Match {
  id: string;
  name: string;
  thumb: string;
  players: Array<Player>;
  schedule: Schedule;
  paymentListPlayers: Array<string>;
  soccerField: SoccerField;
  teams: Array<Team>;
  description: string;

  public constructor(params: MatchParams) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.players = params?.players || [];
    this.soccerField = params.soccerField;
    this.schedule = params.schedule;
    this.thumb = params.thumb;
    this.teams = [];
    this.paymentListPlayers = [];
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
