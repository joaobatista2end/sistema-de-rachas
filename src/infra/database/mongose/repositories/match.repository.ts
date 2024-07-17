import { Model, Types } from 'mongoose';
import { MatchDto } from '../models/match.model';
import { MatchRepository } from '../../repositories/match.repository';
import { match } from 'assert';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDto>;

  constructor(model: Model<MatchDto>) {
    this.model = model;
  }

  async findById(id: string): Promise<MatchDto | null> {
    return this.model.findById(id).exec();
  }

  async findByName(name: string): Promise<MatchDto | null> {
    return this.model.findOne({ name }).exec();
  }

  async create(match: MatchDto): Promise<MatchDto> {
    const newMatch = new this.model(match);
    return newMatch.save();
  }

  async update(id: string, match: Partial<MatchDto>): Promise<MatchDto | null> {
    return this.model.findByIdAndUpdate(id, match, { new: true }).exec();
  }

  async delete(id: string): Promise<MatchDto | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
