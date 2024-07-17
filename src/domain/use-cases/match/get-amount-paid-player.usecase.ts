import { uid } from 'uid';

import { Match, MatchParams } from '../../entities/match';
import { Schedule } from '../../entities/schedule';
import { SoccerField } from '../../entities/soccer-field';
import { playerFactory } from '../../factories/player';
import { Time } from '../../object-values/time';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/mongose/repositories/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';

export class GetAmountPaidPlayerUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );
  public static async execute(id: string): Promise<number> {
    const match = await GetAmountPaidPlayerUseCase.repository.findById(id);

    if (!match) return 0;

    const matchEntity = new Match(match as MatchParams);

    return matchEntity.amountToBePaidPerPlayer;
  }
}
