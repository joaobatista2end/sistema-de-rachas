export type ScheduleDto = {
  id: string;
  startTime: string;
  finishTime: string;
  day: string;
  formattedDay: string;
};

export type CreateScheduleDto = {
  startTime: string;
  finishTime: string;
  day: string;
};
