import { Model } from 'mongoose';
import { MatchRepository } from '../../repositories/match.repository';
import { ScheduleRepository } from '../../repositories/schedule.repository';
import { ScheduleMongoRepository } from './schedule.repository';
import { CreateMatchDto } from '../../../../domain/dto/match.dto';
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
import { match } from 'assert';
import { DayOfWeek } from '../../../../domain/object-values/day';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDocumentWithRelations>;
  private scheduleRepository: ScheduleRepository;

  constructor(model: Model<MatchDocumentWithRelations>) {
    this.model = model;
    this.scheduleRepository = new ScheduleMongoRepository(ScheduleModel);
  }
  async all(): Promise<Array<Match>> {
    const matchs = await this.model
      .find()
      .populate(['soccerField', 'players', 'schedule'])
      .exec();
    return matchs
      .map((match) => this.parseToEntity(match))
      .filter((match) => match !== null);
  }
  findByName(name: string): Promise<Match | null> {
    throw new Error('Method not implemented.');
  }
  async create(data: CreateMatchDto): Promise<Match | null> {
    const schedule = await this.scheduleRepository.create(data.schedule);
    if (!schedule) throw Error('Erro ao criar agendamento da partida');
    const match = new this.model({
      ...data,
      schedule: schedule.id,
    });

    await match.save();

    return this.findById(match._id);
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
    if (!match.soccerField?._id)
      throw Error('É necessário especificiar o campo');
    if (!match.schedule?._id) throw Error('É necessário especificiar o campo');

    return this.parseToEntity(match);
  }

  private parseToEntity(match: MatchDocumentWithRelations): Match | null {
    if (!match?.soccerField?._id || !match?.schedule?._id) {
      return null;
    }
    return new Match({
      id: match._id || uid(),
      description: match.description,
      name: match.name,
      thumb: match.thumb,
      players: (match?.players || []).map((player) => {
        return (
          new Player({
            id: player._id || uid(),
            name: player.name,
            stars: player.stars,
          }) || []
        );
      }),
      soccerField: new SoccerField({
        id: match.soccerField?._id || uid(),
        pixKey: match.soccerField.pixKey,
        rentalValue: match.soccerField.rentalValue,
        workDays: match.soccerField.workDays.map(
          (day: string) => day as DayOfWeek
        ),
        workStartTime: match.soccerField.workStartTime,
        workFinishTime: match.soccerField.workFinishTime,
      }),
      schedule: new Schedule({
        id: match.schedule?._id || uid(),
        day: match.schedule.day,
        startTime: match.schedule.startTime,
        finishTime: match.schedule.finishTime,
      }),
    });
  }
}
