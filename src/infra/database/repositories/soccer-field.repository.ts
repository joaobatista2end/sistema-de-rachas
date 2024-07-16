import { Types } from 'mongoose';
import { SoccerFieldDto } from '../mongose/models/soccer-field.model';

export interface SoccerFieldRepository {
  findById(id: Types.ObjectId): Promise<SoccerFieldDto | null>;
  findByName(name: string): Promise<SoccerFieldDto | null>;
  create(user: SoccerFieldDto): Promise<SoccerFieldDto>;
  update(
    id: Types.ObjectId,
    user: Partial<SoccerFieldDto>
  ): Promise<SoccerFieldDto | null>;
  delete(id: Types.ObjectId): Promise<SoccerFieldDto | null>;
}
