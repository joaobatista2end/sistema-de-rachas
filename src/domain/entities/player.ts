import { uid } from 'uid';

import { Match } from './match';

export type PlayerParams = {
  name: string;
  stars: number;
  id: string;
};

export class Player {
  id: string;
  name: string;
  stars: number;

  public constructor(params: PlayerParams) {
    this.id = params.id;
    this.name = params.name;
    this.stars = params.stars;
  }

  public isPaid(match: Match) {
    return !!match.paymentListPlayers.find(
      (paymentPlayerId) => paymentPlayerId === this.id
    );
  }
}
