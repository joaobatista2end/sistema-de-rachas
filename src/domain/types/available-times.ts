import { Schedule } from '../entities/schedule';

export type AvailableTimesByDay = {
  [day: string]: Schedule[];
};
