import { Time } from '../object-values/time';

export type ScheduleParams = {
  startTime: string;
  finishTime: string;
  day: string;
};

export class Schedule {
  startTime: Time;
  finishTime: Time;
  day: Date;

  public constructor(params: ScheduleParams) {
    this.startTime = new Time(params.startTime);
    this.finishTime = new Time(params.finishTime);
    this.day = new Date(params.day);
  }

  public get totalHours(): number {
    return Math.abs(this.finishTime.number - this.startTime.number);
  }
}
