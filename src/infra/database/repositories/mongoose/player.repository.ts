import { Model, Types } from 'mongoose';
import { PlayerRepository } from '../../repositories/player.respository';
import { PlayerDto } from '../models/player.model';

export class PlayerMongoRepository implements PlayerRepository {
  private model: Model<PlayerDto>;

  constructor(model: Model<PlayerDto>) {
    this.model = model;
  }

  async findById(id: Types.ObjectId): Promise<PlayerDto | null> {
    return this.model.findById(id).exec();
  }

  async findByName(name: string): Promise<PlayerDto | null> {
    return this.model.findOne({ name }).exec();
  }

  async create(player: PlayerDto): Promise<PlayerDto> {
    const newRegister = new this.model(player);
    return newRegister.save();
  }

  async update(
    id: Types.ObjectId,
    player: Partial<PlayerDto>
  ): Promise<PlayerDto | null> {
    return this.model.findByIdAndUpdate(id, player, { new: true }).exec();
  }

  async delete(id: Types.ObjectId): Promise<PlayerDto | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
