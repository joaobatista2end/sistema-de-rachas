import { Model } from 'mongoose';
import { MatchRepository } from '../../repositories/match.repository';
import { ScheduleRepository } from '../../repositories/schedule.repository';
import { ScheduleMongoRepository } from './schedule.repository';
import { CreateMatchDto } from '../../../../domain/dto/match.dto';
import { ScheduleModel } from '../../mongose/models/schedule.model';
import { MatchDocumentWithRelations } from '../../mongose/models/match.model';
import { Match } from '../../../../domain/entities/match';
import { Player } from '../../../../domain/entities/player';
import { SoccerField } from '../../../../domain/entities/soccer-field';
import { Schedule } from '../../../../domain/entities/schedule';
import { uid } from 'uid';
import { DayOfWeek } from '../../../../domain/object-values/day';
import { User } from '../../../../domain';

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
  async create(data: CreateMatchDto): Promise<Match | null> {
    const matchModel = new this.model(data);
    const match = await matchModel.save();
    return this.findById(match._id);
  }
  async update(
    id: string,
    data: Partial<CreateMatchDto>
  ): Promise<Match | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .populate(['soccerField', 'players', 'schedule'])
      .exec();

    if (!updated?._id) return null;

    return this.parseToEntity(updated);
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
      throw Error('Campo não encontrado! Verifique as informações da partida.');
    if (!match.schedule?._id)
      throw Error(
        'Horário não encontrado! Verifique as informações da partida.'
      );

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
      players: (match?.players ?? []).map((player) => {
        return (
          new Player({
            id: player._id || uid(),
            name: player.name,
            stars: player.stars,
          }) ?? []
        );
      }),
      soccerField: new SoccerField({
        id: match.soccerField?._id || uid(),
        name: match.soccerField.name,
        pixKey: match.soccerField.pixKey,
        rentalValue: match.soccerField.rentalValue,
        workDays: match.soccerField.workDays.map(
          (day: string) => day as DayOfWeek
        ),
        workStartTime: match.soccerField.workStartTime,
        workFinishTime: match.soccerField.workFinishTime,
        user: new User({
          id: match.soccerField.user?._id || uid(),
          email: match.soccerField.user.email,
          name: match.soccerField.user.email,
          role: match.soccerField.user.role,
          password: match.soccerField.user.password,
          photoUrl: match.soccerField.user.photoUrl,
        }),
      }),
      schedule: new Schedule({
        id: match.schedule?._id || uid(),
        day: match.schedule.day,
        startTime: match.schedule.startTime,
        finishTime: match.schedule.finishTime,
      }),
      user: new User({
        id: match.user?._id || uid(),
        email: match.user.email,
        name: match.user.name,
        role: match.user.role,
        password: match.user.password,
        photoUrl: match.user.photoUrl,
      }),
    });
  }
}
