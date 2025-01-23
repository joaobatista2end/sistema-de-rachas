import { Match } from '../../../domain/entities/match';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';

export class GetUserUnpaidMatchesUseCase {
  constructor(private matchRepository: MatchMongoRepository) {}

  async execute(userId: string): Promise<Either<HttpError, Match[]>> {
    try {
      const matches = await this.matchRepository.findUnpaidMatchesByUser(
        userId
      );

      if (!matches.length) {
        return left(
          new HttpError(
            HttpStatusCode.NOT_FOUND,
            'Nenhuma partida não paga encontrada para o usuário.'
          )
        );
      }

      return right(matches);
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
