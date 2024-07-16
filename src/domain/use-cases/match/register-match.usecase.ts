import MatchModel, {
  MatchDto,
} from '../../../infra/database/mongose/models/match.model';
import { MatchMongoRepository } from '../../../infra/database/mongose/repositories/mach.repository';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';

export class RegisterMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(matchDto: MatchDto) {
    const registredMatch = await RegisterMatchUseCase.repository.create(
      matchDto
    );
    return registredMatch;
  }
}
