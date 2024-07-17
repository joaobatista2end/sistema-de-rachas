import { MatchDto } from '../mongose/models/match.model';

export interface MatchRepository {
  findById(id: string): Promise<MatchDto | null>;
  findByName(name: string): Promise<MatchDto | null>;
  create(user: MatchDto): Promise<MatchDto>;
  update(id: string, user: Partial<MatchDto>): Promise<MatchDto | null>;
  delete(id: string): Promise<MatchDto | null>;
}
