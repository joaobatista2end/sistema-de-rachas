import { uid } from 'uid';

import { Player } from './player';
import { Schedule } from './schedule';
import { SoccerField } from './soccer-field';
import { Team } from './team';

export type MatchParams = {
  soccerField: SoccerField;
  schedule: Schedule;
};

export class Match {
  id: string;
  players: Array<Player>;
  schedule: Schedule;
  paymentListPlayers: Array<string>;
  soccerField: SoccerField;
  teams: Array<Team>;

  public constructor(params: MatchParams) {
    this.id = uid();
    this.players = [];
    this.paymentListPlayers = [];
    this.soccerField = params.soccerField;
    this.schedule = params.schedule;
    this.teams = [];
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
