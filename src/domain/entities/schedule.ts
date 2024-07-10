import { Time } from '../object-values/time';

export type ScheduleParams = {
  startTime: Time;
  finishTime: Time;
  day: Date;
};

export class Schedule {
  startTime: Time;
  finishTime: Time;
  day: Date;

  public constructor(params: ScheduleParams) {
    this.startTime = params.startTime;
    this.finishTime = params.finishTime;
    this.day = params.day;
  }

  public get totalHours(): number {
    return 0;
  }
}
