"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uid_1 = require("uid");
const vitest_1 = require("vitest");
const match_1 = require("../../entities/match");
const schedule_1 = require("../../entities/schedule");
const soccer_field_1 = require("../../entities/soccer-field");
const team_1 = require("../../entities/team");
const player_1 = require("../../factories/player");
const generate_teams_usecase_1 = require("./generate-teams.usecase");
const soccerField = new soccer_field_1.SoccerField({
    id: (0, uid_1.uid)(),
    pixKey: (0, uid_1.uid)(),
    rentalValue: 300,
    workDays: ['sábado', 'domingo'],
    workFinishTime: '08:00:00',
    workStartTime: '18:00:00',
});
const schedule = new schedule_1.Schedule({
    id: (0, uid_1.uid)(),
    day: '10/02/2024',
    startTime: '10:30:00',
    finishTime: '16:30:00',
});
(0, vitest_1.describe)('Gerar times do racha', () => {
    (0, vitest_1.it)('should verify if teams are generated correctly', () => {
        const match = new match_1.Match({
            id: (0, uid_1.uid)(),
            description: 'Some description',
            thumb: 'asdasd',
            name: 'Some match',
            soccerField,
            schedule,
        });
        const players = (0, player_1.playerFactory)(12);
        const players2 = (0, player_1.playerFactory)(100);
        match.players = players;
        const teams = generate_teams_usecase_1.GenerateTeamsUseCase.execute(match);
        (0, vitest_1.expect)(teams.length).equals(2);
        match.players = players2;
        const teams2 = generate_teams_usecase_1.GenerateTeamsUseCase.execute(match);
        (0, vitest_1.expect)(teams2.length).equals(16);
    });
    (0, vitest_1.it)('should verify if teams are balanced correctly', () => {
        const match = new match_1.Match({
            id: (0, uid_1.uid)(),
            description: 'Some description',
            thumb: 'asdasd',
            name: 'Some match',
            soccerField,
            schedule,
        });
        const players = (0, player_1.playerFactory)(30);
        match.players = players;
        const teams = generate_teams_usecase_1.GenerateTeamsUseCase.execute(match);
        const minStars = Math.min(...teams.map((team) => team.totalStars));
        const maxStars = Math.max(...teams.map((team) => team.totalStars));
        (0, vitest_1.expect)(maxStars - minStars).toBeLessThanOrEqual(1);
        (0, vitest_1.expect)(teams.length).toBeGreaterThanOrEqual(2);
        for (const team of teams) {
            (0, vitest_1.expect)(team.players.length).toBeGreaterThanOrEqual(team_1.Team.minPlayers);
            (0, vitest_1.expect)(team.players.length).toBeLessThanOrEqual(team_1.Team.maxPlayers);
        }
    });
});
