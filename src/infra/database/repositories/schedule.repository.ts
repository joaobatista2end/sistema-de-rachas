import {
  CreateScheduleDto,
  ScheduleDto,
} from '../../../domain/dto/schedule.dto';

export interface ScheduleRepository {
  findById(id: string): Promise<ScheduleDto | null>;
  findByName(name: string): Promise<ScheduleDto | null>;
  create(data: CreateScheduleDto): Promise<void>;
  update(id: string, user: Partial<ScheduleDto>): Promise<ScheduleDto | null>;
  delete(id: string): Promise<ScheduleDto | null>;
}
