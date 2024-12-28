import { Match } from '../../../domain/entities/match';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';
import { HttpStatusCode } from '../../enums';

export class GetUserMatchesUseCase {
  static async execute(userId: string): Promise<Either<HttpError, Match[]>> {
    try {
      const repository = new MatchMongoRepository(MatchModel);
      const matches = await MatchModel.find({ user: userId })
        .populate(['soccerField', 'schedules'])
        .exec();

      if (!matches) {
        return right([]);
      }

      // Converte documentos do MongoDB para entidades Match
      const matchEntities = matches
        .map((match) => repository.parseToEntity(match))
        .filter((match): match is Match => match !== null);

      // Ordena por data
      return right(
        matchEntities.sort((a, b) => {
          const dateA = new Date(
            `${a.schedules[0].day} ${a.schedules[0].startTime}`
          );
          const dateB = new Date(
            `${b.schedules[0].day} ${b.schedules[0].startTime}`
          );
          return dateB.getTime() - dateA.getTime();
        })
      );
    } catch (error) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao buscar partidas do usuário'
        )
      );
    }
  }
}
