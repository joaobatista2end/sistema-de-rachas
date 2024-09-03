import { CreateMatchDto, MatchDto } from '../../../domain/dto/match.dto';
import { Match } from '../../../domain/entities/match';

export interface MatchRepository {
  all(): Promise<Array<Match>>;
  findById(id: string): Promise<Match | null>;
  findByName(name: string): Promise<Match | null>;
  create(data: CreateMatchDto): Promise<Match | null>;
  update(id: string, data: Partial<CreateMatchDto>): Promise<Match | null>;
  delete(id: string): Promise<Match | null>;
}
