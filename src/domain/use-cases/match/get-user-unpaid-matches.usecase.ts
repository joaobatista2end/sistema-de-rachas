import { Match } from '../../../domain/entities/match';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';

export class GetUserUnpaidMatchesUseCase {
  constructor(private matchRepository: MatchRepository) {}

  async execute(userId: string): Promise<Either<HttpError, Match[]>> {
    try {
      const matches = await this.matchRepository.findUnpaidMatchesByUser(
        userId
      );
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
