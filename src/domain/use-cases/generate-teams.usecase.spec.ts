import { uid } from 'uid';
import { describe, expect, it } from 'vitest';

import { Match } from '../entities/match';
import { Schedule } from '../entities/schedule';
import { SoccerField } from '../entities/soccer-field';
import { Team } from '../entities/team';
import { playerFactory } from '../factories/player';
import { Time } from '../object-values/time';
import { GenerateTeamsUseCase } from './generate-teams.usecase';

describe('Gerar times do racha', () => {
  it('should verify if teams are generated correctly', () => {
    const soccerField = new SoccerField({
      pixKey: uid(),
      rentalValue: 300,
    });
    const schedule = new Schedule({
      day: new Date(),
      startTime: new Time('10:30:00'),
      finishTime: new Time('16:30:00'),
    });

    const match = new Match({ soccerField, schedule });
    const players = playerFactory(12);
    const players2 = playerFactory(100);
    match.players = players;
    const teams = GenerateTeamsUseCase.execute(match);
    expect(teams.length).equals(2);
    match.players = players2;
    const teams2 = GenerateTeamsUseCase.execute(match);
    expect(teams2.length).equals(16);
  });

  it('should verify if teams are balanced correctly', () => {
    const soccerField = new SoccerField({
      pixKey: uid(),
      rentalValue: 300,
    });

    const schedule = new Schedule({
      day: new Date(),
      startTime: new Time('10:30:00'),
      finishTime: new Time('16:30:00'),
    });

    const match = new Match({ soccerField, schedule });

    const players = playerFactory(30); // Ajuste a quantidade de jogadores conforme necessário
    match.players = players;

    const teams = GenerateTeamsUseCase.execute(match);

    console.log(`Number of teams: ${teams.length}`);
    teams.forEach((team, index) => {
      console.log(`Team ${index + 1}:`);
      console.log(`Total Stars: ${team.totalStars}`);
      console.dir(team, { depth: null, colors: true });
    });

    const minStars = Math.min(...teams.map((team) => team.totalStars));
    const maxStars = Math.max(...teams.map((team) => team.totalStars));
    expect(maxStars - minStars).toBeLessThanOrEqual(1);

    expect(teams.length).toBeGreaterThanOrEqual(2);
    for (const team of teams) {
      expect(team.players.length).toBeGreaterThanOrEqual(Team.minPlayers);
      expect(team.players.length).toBeLessThanOrEqual(Team.maxPlayers);
    }
  });
});
