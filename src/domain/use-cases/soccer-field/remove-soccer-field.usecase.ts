import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { SoccerFieldRepository } from '../../../infra/database/repositories/soccer-field.repository';

export class RemoveSoccerFieldUseCasee {
  private static repository: SoccerFieldRepository = new SoccerFieldMongoRepository(SoccerFieldModel);

  static async execute(id: string) {
    try {
      const deletedField = await RemoveSoccerFieldUseCasee.repository.delete(id);
      if (!deletedField) {
        throw new Error('Campo não encontrado para o ID fornecido.');
      }
    } catch (error) {
      console.error('Erro ao executar a deleção:', error);
      throw new Error('Erro ao tentar deletar o campo.');
    }
  }
}