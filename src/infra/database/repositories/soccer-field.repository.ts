import { Types } from 'mongoose';
import {
  CreateSoccerFieldDto,
  SoccerFieldDto,
} from '../../../domain/dto/soccer-field.dto';

export interface SoccerFieldRepository {
  findById(id: string): Promise<SoccerFieldDto | null>;
  findByName(name: string): Promise<SoccerFieldDto | null>;
  create(data: string): Promise<void>;
  update(
    id: Types.ObjectId,
    data: Partial<CreateSoccerFieldDto>
  ): Promise<string | null>;
  delete(id: Types.ObjectId): Promise<SoccerFieldDto | null>;
}
