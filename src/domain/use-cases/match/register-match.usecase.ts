import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { CreateMatchDto } from '../../dto/match.dto';

export class RegisterMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(matchDto: CreateMatchDto) {
    await RegisterMatchUseCase.repository.create(matchDto);
    const populatedMatch = await MatchModel.findById(registredMatch._id)
      .populate('soccerField')
      .exec();
    return populatedMatch;
  }
}
