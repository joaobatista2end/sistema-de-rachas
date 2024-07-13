import { Model, Types } from 'mongoose';
import { PlayerRepository } from '../../repositories/player.respository';
import PlayerModel, { PlayerDto } from '../models/player.model';

export class PlayerMongoRepository implements PlayerRepository {
  private playerModel: Model<PlayerDto>;

  constructor(playerModel: Model<PlayerDto>) {
    this.playerModel = playerModel;
  }

  async findById(id: Types.ObjectId): Promise<PlayerDto | null> {
    return this.playerModel.findById(id).exec();
  }

  async findByName(name: string): Promise<PlayerDto | null> {
    return this.playerModel.findOne({ name }).exec();
  }

  async create(player: PlayerDto): Promise<PlayerDto> {
    const newPlayer = new this.playerModel(player);
    return newPlayer.save();
  }

  async update(
    id: Types.ObjectId,
    player: Partial<PlayerDto>
  ): Promise<PlayerDto | null> {
    return this.playerModel.findByIdAndUpdate(id, player, { new: true }).exec();
  }

  async delete(id: Types.ObjectId): Promise<PlayerDto | null> {
    return this.playerModel.findByIdAndDelete(id).exec();
  }
}
