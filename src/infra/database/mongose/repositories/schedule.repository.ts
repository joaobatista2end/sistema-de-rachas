import { Model, Types } from 'mongoose';
import { ScheduleDto } from '../models/schedule.model';
import { ScheduleRepository } from '../../repositories/schedule.repository';

export class ScheduleMongoRepository implements ScheduleRepository {
  private model: Model<ScheduleDto>;

  constructor(model: Model<ScheduleDto>) {
    this.model = model;
  }

  async findById(id: string): Promise<ScheduleDto | null> {
    return this.model.findById(id).exec();
  }

  async findByName(name: string): Promise<ScheduleDto | null> {
    return this.model.findOne({ name }).exec();
  }

  async create(Schedule: ScheduleDto): Promise<ScheduleDto> {
    const newSchedule = new this.model(Schedule);
    return newSchedule.save();
  }

  async update(
    id: string,
    Schedule: Partial<ScheduleDto>
  ): Promise<ScheduleDto | null> {
    return this.model.findByIdAndUpdate(id, Schedule, { new: true }).exec();
  }

  async delete(id: string): Promise<ScheduleDto | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
