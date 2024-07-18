import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { CreateMatchDto, MatchDto } from '../../dto/match.dto';

export class UpdateMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(id: string, matchDto: Partial<CreateMatchDto>) {
    return UpdateMatchUseCase.repository.update(id, matchDto);
  }
}
