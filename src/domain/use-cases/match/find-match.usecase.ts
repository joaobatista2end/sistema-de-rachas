import MatchModel, {
  MatchDto,
} from '../../../infra/database/mongose/models/match.model';
import { MatchMongoRepository } from '../../../infra/database/mongose/repositories/match.repository';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';

export class FindMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(id: string) {
    return FindMatchUseCase.repository.findById(id);
  }
}
