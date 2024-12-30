import { Match } from '../../../domain/entities/match';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';
import { HttpStatusCode } from '../../enums';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';

export class GetUserMatchesUseCase {
  static async execute(userId: string): Promise<Either<HttpError, Match[]>> {
    try {
      const repository = new MatchMongoRepository(MatchModel);
      const soccerFieldRepository = new SoccerFieldMongoRepository(
        SoccerFieldModel
      );

      // Primeiro busca os campos do dono
      const ownerFields = await soccerFieldRepository.allByUser(userId);
      const fieldIds = ownerFields.map((field) => field.id);

      // Depois busca as partidas desses campos
      const matches = await MatchModel.find({
        soccerField: { $in: fieldIds },
      })
        .populate(['soccerField', 'schedules'])
        .exec();

      const matchEntities = matches
        .map((match) => repository.parseToEntity(match))
        .filter((match): match is Match => match !== null)
        .sort((a, b) => {
          const dateA = new Date(
            `${a.schedules[0].day} ${a.schedules[0].startTime}`
          );
          const dateB = new Date(
            `${b.schedules[0].day} ${b.schedules[0].startTime}`
          );
          return dateA.getTime() - dateB.getTime();
        });

      return right(matchEntities);
    } catch (error) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao buscar partidas dos campos'
        )
      );
    }
  }
}
