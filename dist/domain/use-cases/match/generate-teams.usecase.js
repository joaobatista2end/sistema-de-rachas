"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTeamsUseCase = void 0;
const uid_1 = require("uid");
const team_1 = require("../../entities/team");
class GenerateTeamsUseCase {
    static execute(match) {
        const players = [...match.players];
        if (players.length < team_1.Team.minPlayers * 2) {
            throw new Error(`É necessário ter no mínimo: ${team_1.Team.minPlayers * 2} jogadores para criar 2 times!`);
        }
        players.sort((a, b) => b.stars - a.stars);
        const playersQuantity = players.length;
        const teamQuantity = Math.floor(playersQuantity / team_1.Team.minPlayers);
        let teams = Array.from({ length: teamQuantity }, (_, index) => new team_1.Team({
            id: (0, uid_1.uid)(),
            name: `Team ${index + 1}`,
            players: [],
        }));
        for (let player of players) {
            let minTeam = teams.reduce((minTeam, currentTeam) => currentTeam.totalStars < minTeam.totalStars ? currentTeam : minTeam, teams[0]);
            minTeam.addPlayer(player);
        }
        const minStars = Math.min(...teams.map((team) => team.totalStars));
        const maxStars = Math.max(...teams.map((team) => team.totalStars));
        if (maxStars - minStars > 1) {
            throw new Error('Erro: Não é possível criar times com diferença de estrelas superior a 1.');
        }
        return teams;
    }
}
exports.GenerateTeamsUseCase = GenerateTeamsUseCase;
