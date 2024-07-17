import { ScheduleDto } from '../mongose/models/schedule.model';

export interface ScheduleRepository {
  findById(id: string): Promise<ScheduleDto | null>;
  findByName(name: string): Promise<ScheduleDto | null>;
  create(user: ScheduleDto): Promise<ScheduleDto>;
  update(id: string, user: Partial<ScheduleDto>): Promise<ScheduleDto | null>;
  delete(id: string): Promise<ScheduleDto | null>;
}
