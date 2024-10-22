import { MatchDto } from '../../domain/dto/match.dto';
import { Match } from '../../domain/entities/match';
import { PlayerPresenter } from './player.presenter';
import { SchedulePresenter } from './schedule.presenter';
import { SoccerFieldPresenter } from './soccer-field.presenter';
import { UserPresenter } from './user.presenter';

export const MatchPresenter = (match: Match | null): MatchDto | null => {
  if (!match) return match;

  return {
    id: match.id.toString(),
    name: match.name,
    description: match.description,
    thumb: match.thumb,
    players: match.players.map((player) => PlayerPresenter(player)),
    schedule: SchedulePresenter(match.schedule),
    soccerField: SoccerFieldPresenter(match.soccerField),
    user: UserPresenter(match.user),
  };
};
