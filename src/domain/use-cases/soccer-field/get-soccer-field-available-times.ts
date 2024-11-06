import { ScheduleDocument } from '../../../infra/database/mongose/models/schedule.model';
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
    day?: string
  ): Promise<Either<HttpError, ScheduleDocument[]>> {
    try {
      const availableTimes =
        await GetSoccerFieldAvailableTimes.repository.getAvailableTimes(
          id,
          day
        );

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
