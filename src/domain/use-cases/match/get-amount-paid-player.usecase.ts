import { uid } from 'uid';

import { Match } from '../../entities/match';
import { Schedule } from '../../entities/schedule';
import { SoccerField } from '../../entities/soccer-field';
import { playerFactory } from '../../factories/player';
import { Time } from '../../object-values/time';

export class GetAmountPaidPlayerUseCase {
  public static execute(id: string): number {
    const soccerField = new SoccerField({
      pixKey: uid(),
      rentalValue: 300,
    });

    const schedule = new Schedule({
      day: new Date(),
      startTime: new Time('10:30:00'),
      finishTime: new Time('16:30:00'),
    });

    const match = new Match({ soccerField, schedule });
    const players = playerFactory(30);
    match.players = players;

    return match.amountToBePaidPerPlayer;
  }
}
