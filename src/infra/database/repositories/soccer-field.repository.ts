import { CreateSoccerFieldDto } from '../../../domain/dto/soccer-field.dto';
import { SoccerField } from '../../../domain/entities/soccer-field';

export interface SoccerFieldRepository {
  all(): Promise<Array<SoccerField>>;
  findById(id: string): Promise<SoccerField | null>;
  findByName(name: string): Promise<SoccerField | null>;
  create(data: CreateSoccerFieldDto): Promise<SoccerField | null>;
  update(
    id: string,
    data: Partial<CreateSoccerFieldDto>
  ): Promise<SoccerField | null>;
  delete(id: string): Promise<void | null>;
}
