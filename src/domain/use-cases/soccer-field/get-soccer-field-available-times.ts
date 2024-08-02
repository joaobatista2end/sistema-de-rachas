import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';

export class GetSoccerFieldAvailableTimes {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(id: string, month?: number) {
    const registredSoccerField =
      await GetSoccerFieldAvailableTimes.repository.findById(id);
    return registredSoccerField?.getAvailableTimes(month);
  }
}
