import SoccerFieldModel, {
  SoccerFieldDto,
} from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';
import { SoccerFieldMongoRepository } from '../../../infra/database/mongose/repositories/soccer-field.repository';

export class RegisterSoccerFieldUseCase {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(SoccerFieldDto: SoccerFieldDto) {
    const registredSoccerField =
      await RegisterSoccerFieldUseCase.repository.create(SoccerFieldDto);
    return registredSoccerField;
  }
}
