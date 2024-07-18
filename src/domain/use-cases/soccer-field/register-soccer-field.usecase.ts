import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';
import { CreateSoccerFieldDto } from '../../dto/soccer-field.dto';

export class RegisterSoccerFieldUseCase {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(SoccerFieldDto: CreateSoccerFieldDto) {
    const registredSoccerField =
      await RegisterSoccerFieldUseCase.repository.create(SoccerFieldDto);
    return registredSoccerField;
  }
}
