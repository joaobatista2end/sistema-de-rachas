import mongoose, { Document, Schema, model, Model } from 'mongoose';
import { ScheduleDocument, scheduleSchema } from './schedule.model';
import { SoccerFieldDocumentWithRelations } from './soccer-field.model';
import { PlayerDocument, playerSchema } from './player.model';
import {
  TeamDocument,
  TeamDocumentWithRelationships,
  teamSchema,
} from './team.model';
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
  teams?: TeamDocumentWithRelationships[];
  user: UserDocument;
}

const matchSchema: Schema = new Schema({
  name: String,
  thumb: String,
  description: String,
  players: [playerSchema],
  schedules: [scheduleSchema],
  teams: [teamSchema],
  soccerField: { type: mongoose.Schema.Types.ObjectId, ref: 'SoccerField' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const MatchModel: Model<MatchDocumentWithRelations> =
  model<MatchDocumentWithRelations>('Match', matchSchema);

export default MatchModel;
