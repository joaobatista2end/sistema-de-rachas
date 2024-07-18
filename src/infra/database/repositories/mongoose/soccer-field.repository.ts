import { Model, Types } from 'mongoose';
import { SoccerFieldRepository } from '../../repositories/soccer-field.repository';
import { SoccerFieldDto } from '../models/soccer-field.model';

export class SoccerFieldMongoRepository implements SoccerFieldRepository {
  private model: Model<SoccerFieldDto>;

  constructor(model: Model<SoccerFieldDto>) {
    this.model = model;
  }

  async findById(id: Types.ObjectId): Promise<SoccerFieldDto | null> {
    return this.model.findById(id).exec();
  }

  async findByName(name: string): Promise<SoccerFieldDto | null> {
    return this.model.findOne({ name }).exec();
  }

  async create(player: SoccerFieldDto): Promise<SoccerFieldDto> {
    const newRegister = new this.model(player);
    return newRegister.save();
  }

  async update(
    id: Types.ObjectId,
    player: Partial<SoccerFieldDto>
  ): Promise<SoccerFieldDto | null> {
    return this.model.findByIdAndUpdate(id, player, { new: true }).exec();
  }

  async delete(id: Types.ObjectId): Promise<SoccerFieldDto | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
