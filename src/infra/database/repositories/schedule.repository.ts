import {
  CreateScheduleDto,
  ScheduleDto,
} from '../../../domain/dto/schedule.dto';
import { Schedule } from '../../../domain/entities/schedule';

export interface ScheduleRepository {
  findById(id: string): Promise<Schedule | null>;
  findByName(name: string): Promise<Schedule | null>;
  create(data: CreateScheduleDto): Promise<void>;
  update(id: string, user: Partial<ScheduleDto>): Promise<Schedule | null>;
  delete(id: string): Promise<void>;
}
