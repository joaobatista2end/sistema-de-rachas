import { Team, TeamDto } from '../../domain';
import { PlayerPresenter } from './player.presenter';

export const TeamPresenter = (team: Team): TeamDto => {
  return {
    id: team.id,
    name: team.name,
    players: (team.players ?? []).map((player) => PlayerPresenter(player)),
  };
};
