import { DayOfWeek } from '../object-values/day';

export type SoccerFieldDto = {
  id: string;
  pixKey: string;
  name: string;
  rentalValue: number;
  workDays: Array<DayOfWeek>;
  workStartTime: string;
  workFinishTime: string;
};

export type CreateSoccerFieldDto = {
  name: string;
  pixKey: string;
  rentalValue: number;
  workDays: Array<DayOfWeek>;
  workStartTime: string;
  workFinishTime: string;
};
