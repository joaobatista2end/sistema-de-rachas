import { CreatePlayerDto, PlayerDto } from './player.dto';
import { CreateScheduleDto, ScheduleDto } from './schedule.dto';
import { SoccerFieldDto } from './soccer-field.dto';
import { CreateTeamDto, TeamDto } from './team.dto';
import { UserDto } from './user.dto';

export type MatchDto = {
  id: string;
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerFieldDto;
  schedules: ScheduleDto[];
  players?: PlayerDto[];
  teams?: TeamDto[];
  user: UserDto;
};

export type CreateMatchDto = {
  name: string;
  thumb: string;
  description: string;
  soccerField: string;
  schedules: CreateScheduleDto[];
  players: CreatePlayerDto[];
  teams: CreateTeamDto[];
  user: string;
};
