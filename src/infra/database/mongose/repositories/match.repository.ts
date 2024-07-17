import { Model, Types } from 'mongoose';
import { MatchDto } from '../models/match.model';
import { MatchRepository } from '../../repositories/match.repository';
import { ScheduleDto, ScheduleModel } from '../models/schedule.model';
import { ScheduleRepository } from '../../repositories/schedule.repository';
import { ScheduleMongoRepository } from './schedule.repository';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDto>;
  private scheduleRepository: ScheduleRepository;

  constructor(model: Model<MatchDto>) {
    this.model = model;
    this.scheduleRepository = new ScheduleMongoRepository(ScheduleModel);
  }

  async findById(id: string): Promise<MatchDto | null> {
    return this.model
      .findById(id)
      .populate(['soccerField', 'players', 'schedule'])
      .exec();
  }

  async findByName(name: string): Promise<MatchDto | null> {
    return this.model.findOne({ name }).exec();
  }

  async create(match: MatchDto): Promise<MatchDto> {
    const schedule = await this.scheduleRepository.create(match.schedule);
    const newMatch = new this.model({
      ...match,
      schedule: schedule._id,
    });
    return newMatch.save();
  }

  async update(id: string, match: Partial<MatchDto>): Promise<MatchDto | null> {
    return this.model.findByIdAndUpdate(id, match, { new: true }).exec();
  }

  async delete(id: string): Promise<MatchDto | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
