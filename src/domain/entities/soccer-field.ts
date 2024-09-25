import { DayOfWeek } from '../object-values/day';
import { Time } from '../object-values/time';
import { AvailableTimesByDay } from '../types/available-times';
import { convertNumberToDayOfWeek } from '../utils/day-of-week';
import { Schedule } from './schedule';

export type SoccerFieldParams = {
  id: string;
  name: string;
  rentalValue: number;
  pixKey: string;
  workDays: Array<DayOfWeek>;
  workStartTime: string;
  workFinishTime: string;
};

export class SoccerField {
  id: string;
  name: string;
  rentalValue: number;
  pixKey: string;
  workDays: Array<DayOfWeek>;
  workStartTime: Time;
  workFinishTime: Time;

  public constructor(params: SoccerFieldParams) {
    this.id = params.id;
    this.name = params.name;
    this.rentalValue = params.rentalValue;
    this.pixKey = params.pixKey;
    this.workDays = params.workDays;
    this.workStartTime = new Time(params.workStartTime);
    this.workFinishTime = new Time(params.workFinishTime);
  }

  public getAvailableTimes(month?: number): AvailableTimesByDay {
    const availableTimes: AvailableTimesByDay = {};
    const year = new Date().getFullYear();

    const months =
      month !== undefined
        ? [month - 1]
        : Array.from({ length: 12 }, (_, i) => i);

    for (const m of months) {
      const daysInMonth = new Date(year, m + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, m, day);
        const dayOfWeek = date.getDay();

        if (this.workDays.includes(convertNumberToDayOfWeek(dayOfWeek))) {
          let currentTime = new Time(this.workStartTime.toString());
          const endTime = new Time(this.workFinishTime.toString());

          const dayString = date.toLocaleDateString('pt-BR');
          if (!availableTimes[dayString]) {
            availableTimes[dayString] = [];
          }

          // Adicionar os horários disponíveis em intervalos de 1 hora
          while (currentTime.isBefore(endTime)) {
            const schedule = new Schedule({
              id: `${date.getTime()}-${currentTime.toString()}`,
              startTime: currentTime.toString(),
              finishTime: currentTime.addHours(1).toString(),
              day: date.toISOString().split('T')[0],
            });
            availableTimes[dayString].push(schedule);
            currentTime = currentTime.addHours(1); // Avança uma hora
          }
        }
      }
    }

    return availableTimes;
  }
}
