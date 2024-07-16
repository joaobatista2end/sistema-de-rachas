import { Model, model, Schema } from 'mongoose';

export interface ScheduleDto extends Document {
  startTime: string;
  finishTime: string;
  day: string;
}

export const scheduleSchema: Schema = new Schema({
  startTime: {
    type: String,
    required: true,
  },
  finishTime: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
});

export const ScheduleModel: Model<ScheduleDto> = model<ScheduleDto>(
  'schedule',
  scheduleSchema
);
