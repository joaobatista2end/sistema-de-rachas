import { Model, Types } from 'mongoose';
import { MatchDto } from '../models/match.model';
import { MatchRepository } from '../../repositories/match.repository';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDto>;

  constructor(model: Model<MatchDto>) {
    this.model = model;
  }

  async findById(id: Types.ObjectId): Promise<MatchDto | null> {
    return this.model.findById(id).exec();
  }

  async findByName(name: string): Promise<MatchDto | null> {
    return this.model.findOne({ name }).exec();
  }

  async create(player: MatchDto): Promise<MatchDto> {
    const newPlayer = new this.model(player);
    return newPlayer.save();
  }

  async update(
    id: Types.ObjectId,
    player: Partial<MatchDto>
  ): Promise<MatchDto | null> {
    return this.model.findByIdAndUpdate(id, player, { new: true }).exec();
  }

  async delete(id: Types.ObjectId): Promise<MatchDto | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
