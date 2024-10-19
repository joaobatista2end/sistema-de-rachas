import { uid } from 'uid';
import { describe, expect, it } from 'vitest';

import { Match } from '../../entities/match';
import { Schedule } from '../../entities/schedule';
import { SoccerField } from '../../entities/soccer-field';
import { Team } from '../../entities/team';
import { playerFactory } from '../../factories/player';
import { GenerateTeamsUseCase } from './generate-teams.usecase';
import { UserFactory } from '../../factories/user';

const soccerField = new SoccerField({
  id: uid(),
  name: 'Campo de teste',
  pixKey: uid(),
  rentalValue: 300,
  workDays: ['sábado', 'domingo'],
  workFinishTime: '08:00:00',
  workStartTime: '18:00:00',
  user: UserFactory.createUser(),
});
const schedule = new Schedule({
  id: uid(),
  day: '10/02/2024',
  startTime: '10:30:00',
  finishTime: '16:30:00',
});

describe('Gerar times do racha', () => {
  it('should verify if teams are generated correctly', () => {
    const match = new Match({
      id: uid(),
      description: 'Some description',
      thumb: 'asdasd',
      name: 'Some match',
      soccerField,
      schedule,
      user: UserFactory.createUser(),
    });
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
    const match = new Match({
      id: uid(),
      description: 'Some description',
      thumb: 'asdasd',
      name: 'Some match',
      soccerField,
      schedule,
      user: UserFactory.createUser(),
    });
    const players = playerFactory(30);
    match.players = players;
    const teams = GenerateTeamsUseCase.execute(match);
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
