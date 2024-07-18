import { Model, Types } from 'mongoose';
import { PlayerRepository } from '../../repositories/player.respository';
import { Player } from '../../../../domain/entities/player';
import { CreatePlayerDto } from '../../../../domain/dto/player.dto';
import { PlayerDocument } from '../../mongose/models/player.model';

export class PlayerMongoRepository implements PlayerRepository {
  private model: Model<PlayerDocument>;

  constructor(model: Model<PlayerDocument>) {
    this.model = model;
  }

  async findById(id: string): Promise<Player | null> {
    const player = await this.model.findById(id).exec();
    if (!player) return null;

    return new Player({
      id: player._id,
      name: player.name,
      stars: player.stars,
    });
  }

  async findByName(name: string): Promise<Player | null> {
    const player = await this.model.findOne({ name }).exec();
    if (!player) return null;

    return new Player({
      id: player._id,
      name: player.name,
      stars: player.stars,
    });
  }

  async create(player: CreatePlayerDto): Promise<Player | null> {
    const created = new this.model(player);
    if (!created) return null;

    return new Player({
      id: created._id,
      name: created.name,
      stars: created.stars,
    });
  }

  async update(id: string, player: Partial<Player>): Promise<Player | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, player, { new: true })
      .exec();
    if (!updated) return null;

    return new Player({
      id: updated._id,
      name: updated.name,
      stars: updated.stars,
    });
  }

  async delete(id: string): Promise<void | null> {
    this.model.findByIdAndDelete(id).exec();
  }
}
