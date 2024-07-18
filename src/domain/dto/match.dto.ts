import { PlayerDto } from './player.dto';
import { CreateScheduleDto, ScheduleDto } from './schedule.dto';
import { SoccerFieldDto } from './soccer-field.dto';

export interface MatchDto extends Document {
  id: string;
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
  schedule: CreateScheduleDto;
  players: string[];
}
