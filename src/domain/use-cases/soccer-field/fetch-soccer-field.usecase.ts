import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';

export class FetchSoccerFieldUseCase {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute() {
    const registredSoccerField = await FetchSoccerFieldUseCase.repository.all();
    return registredSoccerField;
  }
}
