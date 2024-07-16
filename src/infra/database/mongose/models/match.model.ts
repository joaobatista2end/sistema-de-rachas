import mongoose, { Document, Schema, model, Model } from 'mongoose';
import { playerSchema } from './player.model';
import { scheduleSchema } from './schedule.model';
import { teamSchema } from './teams.model';

export interface MatchDto extends Document {
  name: string;
  thumb: string;
  description: string;
}

const matchSchema: Schema = new Schema({
  players: [playerSchema],
  schedule: scheduleSchema,
  soccerField: { type: mongoose.Schema.Types.ObjectId, ref: 'soccer-field' },
  teams: teamSchema,
});

const MatchModel: Model<MatchDto> = model<MatchDto>('match', matchSchema);

export default MatchModel;
