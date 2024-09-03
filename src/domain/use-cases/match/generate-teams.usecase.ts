import { uid } from 'uid';
import { Match } from '../../entities/match';
import { Team } from '../../entities/team';

export class GenerateTeamsUseCase {
  public static execute(match: Match): Array<Team> {
    const players = [...match.players];
    if (players.length < Team.minPlayers * 2) {
      throw new Error(
        `É necessário ter no mínimo: ${
          Team.minPlayers * 2
        } jogadores para criar 2 times!`
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

    if (maxStars - minStars > 1) {
      throw new Error(
        'Erro: Não é possível criar times com diferença de estrelas superior a 1.'
      );
    }

    return teams;
  }
}
