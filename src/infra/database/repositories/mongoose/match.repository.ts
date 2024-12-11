import { Model } from 'mongoose';
import { MatchRepository } from '../../repositories/match.repository';
import { CreateMatchDto } from '../../../../domain/dto/match.dto';
import { MatchDocumentWithRelations } from '../../mongose/models/match.model';
import { Match } from '../../../../domain/entities/match';
import { Player } from '../../../../domain/entities/player';
import { SoccerField } from '../../../../domain/entities/soccer-field';
import { Schedule } from '../../../../domain/entities/schedule';
import { uid } from 'uid';
import { DayOfWeek } from '../../../../domain/object-values/day';
import { CreateTeamDto, HttpStatusCode, User } from '../../../../domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RemoveMatchUseCase } from '../../../../domain/use-cases/match/remove-match.usecase';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDocumentWithRelations>;

  constructor(model: Model<MatchDocumentWithRelations>) {
    this.model = model;
  }

  async all(): Promise<Array<Match>> {
    const matchs = await this.model
      .find()
      .populate(['soccerField', 'players', 'schedules'])
      .exec();
    return matchs
      .map((match) => this.parseToEntity(match))
      .filter((match) => match !== null);
  }

  async create(data: CreateMatchDto): Promise<Match | null> {
    const matchData = { ...data };
    const matchModel = new this.model(matchData);
    const match = await matchModel.save();

    return this.findById(match._id);
  }

  async update(
    id: string,
    data: Partial<CreateMatchDto>
  ): Promise<Match | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .populate(['soccerField', 'players', 'schedules'])
      .exec();

    if (!updated?._id) return null;

    return this.parseToEntity(updated);
  }

  async createTeams(
    id: string,
    data: Array<CreateTeamDto>
  ): Promise<Match | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .populate(['soccerField', 'players', 'schedules', 'teams'])
      .exec();

    if (!updated?._id) return null;

    return this.parseToEntity(updated);
  }

  async delete(id: string): Promise<Match | null> {
    const deletedMatch = await this.model.findByIdAndDelete(id);

    console.log({ deletedMatch });

    if (!deletedMatch) {
      return null;
    }

    return this.parseToEntity(deletedMatch);
  }

  async findById(id: string): Promise<Match | null> {
    const match = await this.model
      .findById(id)
      .populate(['soccerField', 'players', 'schedules'])
      .exec();

    if (!match) throw Error('Partida não encontrada');
    if (!match.soccerField?._id)
      throw Error('Campo não encontrado! Verifique as informações da partida.');
    if (!match.schedules.length) throw Error('Sem horários na partida');

    return this.parseToEntity(match);
  }

  private parseToEntity(match: MatchDocumentWithRelations): Match | null {
    if (
      !match?.soccerField?._id ||
      !Array.isArray(match?.schedules) ||
      match.schedules.length === 0
    ) {
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
            stars: player?.stars,
            position: player.position,
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
      schedules: match.schedules.map(
        (schedule) =>
          new Schedule({
            id: schedule._id || uid(),
            day: schedule.day,
            startTime: schedule.startTime,
            finishTime: schedule.finishTime,
          })
      ),
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
