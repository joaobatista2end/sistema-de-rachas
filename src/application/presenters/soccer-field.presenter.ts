import { SoccerFieldDto } from '../../domain/dto/soccer-field.dto';
import { SoccerField } from '../../domain/entities/soccer-field';

export const SoccerFieldPresenter = (
  soccerField: SoccerField
): SoccerFieldDto => {
  return {
    id: soccerField.id.toString(),
    name: soccerField.name,
    pixKey: soccerField.pixKey,
    rentalValue: soccerField.rentalValue,
    workDays: soccerField.workDays,
    workFinishTime: soccerField.workFinishTime.toString(),
    workStartTime: soccerField.workStartTime.toString(),
  };
};
