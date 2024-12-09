import { uid } from 'uid';
import { Team } from '../../entities/team';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';

export class GenerateTeamsByPlayerStarsUseCase {
  private static readonly repository: MatchRepository =
    new MatchMongoRepository(MatchModel);

  public static async execute(
    matchId: string
  ): Promise<Either<HttpError, Array<Team>>> {
    const match = await GenerateTeamsByPlayerStarsUseCase.repository.findById(
      matchId
    );

    if (!match) {
      return left(
        new HttpError(HttpStatusCode.NOT_FOUND, 'Partida não encontrada.')
      );
    }

    const players = [...match.players];

    if (players.length < Team.minPlayers * 2) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `É necessário ter no mínimo: ${
            Team.minPlayers * 2
          } jogadores para criar 2 times!`
        )
      );
    }

    players.sort((a, b) => b.stars - a.stars);
    const playersQuantity = players.length;
    const teamQuantity = Math.floor(playersQuantity / Team.minPlayers);
    let teams = Array.from(
      { length: teamQuantity },
      (_, index) =>
        new Team({
          id: uid(),
          name: `Team ${index + 1}`,
          players: [],
        })
    );

    for (let player of players) {
      let minTeam = teams.reduce(
        (minTeam, currentTeam) =>
          currentTeam.totalStars < minTeam.totalStars ? currentTeam : minTeam,
        teams[0]
      );

      minTeam.addPlayer(player);
    }

    const minStars = Math.min(...teams.map((team) => team.totalStars));
    const maxStars = Math.max(...teams.map((team) => team.totalStars));

    if (maxStars - minStars > 2) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Não é possível criar times com diferença de estrelas superior a 1.'
        )
      );
    }

    return right(teams);
  }
}
