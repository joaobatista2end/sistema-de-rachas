import { Types } from 'mongoose';
import { MatchDto } from '../mongose/models/match.model';

export interface MatchRepository {
  findById(id: Types.ObjectId): Promise<MatchDto | null>;
  findByName(name: string): Promise<MatchDto | null>;
  create(user: MatchDto): Promise<MatchDto>;
  update(id: Types.ObjectId, user: Partial<MatchDto>): Promise<MatchDto | null>;
  delete(id: Types.ObjectId): Promise<MatchDto | null>;
}
