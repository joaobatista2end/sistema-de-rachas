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
    const registredPlayer = await RegisterMatchUseCase.repository.create(
      matchDto
    );
    return registredPlayer;
  }
}
