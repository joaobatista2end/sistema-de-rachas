import { Types } from 'mongoose';
import { PlayerDto } from '../mongose/models/player.model';

export interface PlayerRepository {
  findById(id: Types.ObjectId): Promise<PlayerDto | null>;
  findByName(name: string): Promise<PlayerDto | null>;
  create(user: PlayerDto): Promise<PlayerDto>;
  update(
    id: Types.ObjectId,
    user: Partial<PlayerDto>
  ): Promise<PlayerDto | null>;
  delete(id: Types.ObjectId): Promise<PlayerDto | null>;
}
