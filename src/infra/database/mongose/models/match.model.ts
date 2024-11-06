import mongoose, { Document, Schema, model, Model } from 'mongoose';
import { ScheduleDocument, scheduleSchema } from './schedule.model';
import { SoccerFieldDocumentWithRelations } from './soccer-field.model';
import { PlayerDocument, playerSchema } from './player.model';
import { TeamDocument } from './team.model';
import { UserDocument } from './user.model';

export interface MatchDocument extends Document<string> {
  name: string;
  thumb: string;
  description: string;
  soccerField?: mongoose.Types.ObjectId;
  schedules: mongoose.Types.ObjectId[];
  players?: mongoose.Types.ObjectId[];
  teams?: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId[];
}

export interface MatchDocumentWithRelations extends Document<string> {
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerFieldDocumentWithRelations;
  schedules: ScheduleDocument[];
  players?: PlayerDocument[];
  teams?: TeamDocument[];
  user: UserDocument;
}

const matchSchema: Schema = new Schema({
  name: String,
  thumb: String,
  description: String,
  players: [playerSchema],
  schedules: [scheduleSchema],
  soccerField: { type: mongoose.Schema.Types.ObjectId, ref: 'soccer-field' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

const MatchModel: Model<MatchDocumentWithRelations> =
  model<MatchDocumentWithRelations>('match', matchSchema);

export default MatchModel;
