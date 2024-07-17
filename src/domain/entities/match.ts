import { uid } from 'uid';

import { Player } from './player';
import { Schedule } from './schedule';
import { SoccerField } from './soccer-field';
import { Team } from './team';
import { MatchDto } from '../../infra/database/mongose/models/match.model';

export type MatchParams = {
  id: string;
  name: string;
  thumb: string;
  description: string;
  soccerField: {
    rentalValue: number;
    pixKey: string;
  };
  schedule: {
    startTime: string;
    finishTime: string;
    day: string;
  };
  players: {
    name: string;
    stars: number;
  }[];
};

export class Match {
  id: string;
  players: Array<Player>;
  schedule: Schedule;
  paymentListPlayers: Array<string>;
  soccerField: SoccerField;
  teams: Array<Team>;

  public constructor(params: MatchDto) {
    this.id = params._id as string;
    this.players = params.players.map((player) => new Player(player));
    this.soccerField = new SoccerField(params.soccerField);
    this.schedule = new Schedule(params.schedule);
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
