import mongoose, { Document, Schema, model, Model } from 'mongoose';
import { SoccerFieldDto } from '../../../../domain/dto/soccer-field.dto';
import { ScheduleDocument } from './schedule.model';
import { SoccerFieldDocument } from './soccer-field.model';
import { PlayerDocument } from './player.model';
import { TeamDocument } from './team.model';

export interface MatchDocument extends Document<string> {
  name: string;
  thumb: string;
  description: string;
  soccerField: mongoose.Types.ObjectId;
  schedule: mongoose.Types.ObjectId;
  players: mongoose.Types.ObjectId[];
  teams: mongoose.Types.ObjectId[];
}

export interface MatchDocumentWithRelations extends Document<string> {
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerFieldDocument;
  schedule: ScheduleDocument;
  players: PlayerDocument[];
  teams: TeamDocument[];
}

const matchSchema: Schema = new Schema({
  name: String,
  thumb: String,
  description: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player' }],
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule' },
  soccerField: { type: mongoose.Schema.Types.ObjectId, ref: 'soccer-field' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
});

const MatchModel: Model<MatchDocumentWithRelations> =
  model<MatchDocumentWithRelations>('match', matchSchema);

export default MatchModel;
