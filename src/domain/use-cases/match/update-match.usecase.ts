import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchMongoRepository } from '../../../infra/database/mongose/repositories/match.repository';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { CreateMatchDto, MatchDto } from '../../dto/match.dto';

export class UpdateMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(id: string, matchDto: Partial<CreateMatchDto>) {
    return UpdateMatchUseCase.repository.update(id, matchDto);
  }
}
