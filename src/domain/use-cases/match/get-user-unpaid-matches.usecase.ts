import { Match } from '../../../domain/entities/match';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';
import { HttpStatusCode } from '../../enums';
import mongoose from 'mongoose';

export class GetUserUnpaidMatchesUseCase {
  static async execute(userId: string): Promise<Either<HttpError, Match[]>> {
    try {
      const repository = new MatchMongoRepository(MatchModel);

      console.log(`Buscando partidas não pagas para o usuário: ${userId}`);

      const userObjectId = new mongoose.Types.ObjectId(userId);

      console.log(
        `Buscando com a consulta: { user: ${userObjectId}, paid: false }`
      );

      const matches = await MatchModel.find({ user: userObjectId, paid: false })
        .populate(['soccerField', 'schedules', 'players', 'teams'])
        .exec();

      console.log(`Partidas encontradas: ${JSON.stringify(matches)}`);

      const matchEntities = (
        await Promise.all(
          matches.map((match) => repository.parseToEntity(match))
        )
      )
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

      console.log(
        `Partidas não pagas após parse: ${JSON.stringify(matchEntities)}`
      );

      return right(matchEntities);
    } catch (error) {
      console.error(`Erro ao buscar partidas não pagas: ${error}`);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao buscar partidas não pagas'
        )
      );
    }
  }
}
