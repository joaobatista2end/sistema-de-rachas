import { uid } from 'uid';

import { Time } from '../object-values/time';
import { Player } from './player';
import { Schedule, ScheduleParams } from './schedule';
import { SoccerField } from './soccer-field';

export type MatchParams = {
  soccerField: SoccerField;
};

export class Match {
  id: string;
  players: Array<Player>;
  private _schedule: Schedule;
  paymentListPlayers: Array<string>;
  soccerField: SoccerField;

  public constructor(params: MatchParams) {
    this.id = uid();
    this.players = [];
    this.paymentListPlayers = [];
    this.soccerField = params.soccerField;
  }

  public set schedule(scheduleParams: {
    day: Date;
    startTime: string;
    finishTime: string;
  }) {
    this._schedule = new Schedule({
      day: scheduleParams.day,
      startTime: new Time(scheduleParams.startTime),
      finishTime: new Time(scheduleParams.finishTime),
    });
  }

  public get schedule(): Schedule {
    return this._schedule;
  }

  public get paymentPlayers(): Array<Player> {
    return this.players.filter((player) => {
      return this.paymentListPlayers.includes(player.id);
    });
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public getPlayer(playerID: string): Player | undefined {
    return this.players.find((playerItem) => playerItem.id === playerID);
  }

  public pay(playerID: string) {
    this.paymentListPlayers.push(playerID);
  }

  public get amountToBePaidPerPlayer() {
    const valueForPlayer = this.soccerField.rentalValue / this.players.length;
    return valueForPlayer;
  }

  public get;
}
