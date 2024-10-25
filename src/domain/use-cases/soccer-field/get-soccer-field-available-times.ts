import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { AvailableTimesByDay } from '../../types/available-times';
import { Either, left, right } from '../../utils';

export class GetSoccerFieldAvailableTimes {
  private static repository: SoccerFieldRepository =
    new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(
    id: string,
    month?: number
  ): Promise<Either<HttpError, AvailableTimesByDay>> {
    try {
      const registredSoccerField =
        await GetSoccerFieldAvailableTimes.repository.findById(id);
      const availableTimes = registredSoccerField?.getAvailableTimes(month);

      if (!availableTimes) {
        return left(
          new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            'Erro ao obter os horários disponíveis'
          )
        );
      }

      return right(availableTimes);
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao obter os horários disponíveis'
        )
      );
    }
  }
}
