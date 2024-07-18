import { Types } from 'mongoose';
import { CreatePlayerDto, PlayerDto } from '../../../domain/dto/player.dto';

export interface PlayerRepository {
  findById(id: string): Promise<PlayerDto | null>;
  findByName(name: string): Promise<PlayerDto | null>;
  create(data: CreatePlayerDto): Promise<void>;
  update(id: string, user: Partial<PlayerDto>): Promise<PlayerDto | null>;
  delete(id: string): Promise<PlayerDto | null>;
}
