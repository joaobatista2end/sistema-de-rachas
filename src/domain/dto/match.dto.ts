import { PlayerDto } from './player.dto';
import { CreateScheduleDto, ScheduleDto } from './schedule.dto';
import { SoccerFieldDto } from './soccer-field.dto';
import { UserDto } from './user.dto';

export type MatchDto = {
  id: string;
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerFieldDto;
  schedule: ScheduleDto;
  players?: PlayerDto[];
  user: UserDto;
};

export type CreateMatchDto = {
  name: string;
  thumb: string;
  description: string;
  soccerField: string;
  schedule: CreateScheduleDto;
  players: string[];
  user: string;
};
