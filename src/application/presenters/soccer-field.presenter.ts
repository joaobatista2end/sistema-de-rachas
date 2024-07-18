import { SoccerFieldDto } from '../../domain/dto/soccer-field.dto';
import { SoccerField } from '../../domain/entities/soccer-field';

export const SoccerFieldPresenter = (
  soccerField: SoccerField
): SoccerFieldDto => {
  return {
    id: soccerField.id,
    pixKey: soccerField.pixKey,
    rentalValue: soccerField.rentalValue,
  };
};
