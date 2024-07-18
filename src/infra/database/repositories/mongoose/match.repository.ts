import { Model, Types } from 'mongoose';
import { MatchRepository } from '../../repositories/match.repository';
import { ScheduleRepository } from '../../repositories/schedule.repository';
import { ScheduleMongoRepository } from './schedule.repository';
import { CreateMatchDto, MatchDto } from '../../../../domain/dto/match.dto';
import { ScheduleModel } from '../../mongose/models/schedule.model';
import {
  MatchDocument,
  MatchDocumentWithRelations,
} from '../../mongose/models/match.model';
import { Match } from '../../../../domain/entities/match';
import { Player } from '../../../../domain/entities/player';
import { SoccerField } from '../../../../domain/entities/soccer-field';
import { Schedule } from '../../../../domain/entities/schedule';
import { uid } from 'uid';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDocumentWithRelations>;
  private scheduleRepository: ScheduleRepository;

  constructor(model: Model<MatchDocumentWithRelations>) {
    this.model = model;
    this.scheduleRepository = new ScheduleMongoRepository(ScheduleModel);
  }
  findByName(name: string): Promise<Match | null> {
    throw new Error('Method not implemented.');
  }
  create(data: CreateMatchDto): Promise<Match> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<CreateMatchDto>): Promise<Match | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Match | null> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Match | null> {
    const match = await this.model
      .findById(id)
      .populate(['soccerField', 'players', 'schedule'])
      .exec();

    if (!match) throw Error('Partida não encontrada');

    return new Match({
      id: match._id,
      description: match.description,
      name: match.name,
      thumb: match.thumb,
      players: match.players.map((player) => {
        return new Player({
          id: player._id || uid(),
          name: player.name,
          stars: player.stars,
        });
      }),
      soccerField: new SoccerField({
        id: match.soccerField?._id || uid(),
        pixKey: match.soccerField.pixKey,
        rentalValue: match.soccerField.rentalValue,
      }),
      schedule: new Schedule({
        id: match.schedule._id || uid(),
        day: match.schedule.day,
        startTime: match.schedule.startTime,
        finishTime: match.schedule.finishTime,
      }),
    });
  }
}
