import { Match } from '../entities/match';
import { Team } from '../entities/team';

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

    // Ordena os jogadores pelo número de estrelas em ordem decrescente
    players.sort((a, b) => b.stars - a.stars);

    // Calcula o número de times
    const playersQuantity = players.length;
    const teamQuantity = Math.floor(playersQuantity / Team.minPlayers);

    // Inicializa os times
    let teams = Array.from(
      { length: teamQuantity },
      (_, index) =>
        new Team({
          name: `Team ${index + 1}`,
          players: [],
        })
    );

    // Função para calcular a soma das estrelas de um time
    const teamStarsSum = (team: Team) =>
      team.players.reduce((sum, player) => sum + player.stars, 0);

    // Distribui os jogadores para equilibrar a soma das estrelas entre os times
    for (let player of players) {
      // Encontra o time com a menor soma de estrelas
      let minTeam = teams.reduce(
        (minTeam, currentTeam) =>
          teamStarsSum(currentTeam) < teamStarsSum(minTeam)
            ? currentTeam
            : minTeam,
        teams[0]
      );

      minTeam.addPlayer(player);
    }

    // Verifica se todos os times têm pelo menos 6 jogadores e a diferença máxima de estrelas é 1
    const minStars = Math.min(...teams.map(teamStarsSum));
    const maxStars = Math.max(...teams.map(teamStarsSum));
    if (maxStars - minStars > 1) {
      throw new Error(
        'Erro: Não é possível criar times com diferença de estrelas superior a 1.'
      );
    }

    return teams;
  }
}
