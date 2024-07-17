import { PlayerDto } from '../../infra/database/mongose/models/player.model';
import { ScheduleDto } from '../../infra/database/mongose/models/schedule.model';
import { SoccerFieldDto } from '../../infra/database/mongose/models/soccer-field.model';

export interface MatchDto extends Document {
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerFieldDto;
  schedule: ScheduleDto;
  players: PlayerDto[];
}

export interface CreateMatchDto extends Document {
  name: string;
  thumb: string;
  description: string;
  soccerField: string;
  schedule: ScheduleDto;
  players: string[];
}
