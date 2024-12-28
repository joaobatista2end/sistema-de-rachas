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
import { CreateTeamDto, HttpStatusCode, Team, User } from '../../../../domain';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RemoveMatchUseCase } from '../../../../domain/use-cases/match/remove-match.usecase';
import { PlayerDocument } from '../../mongose/models/player.model';
import {
  SoccerFieldDocument,
  SoccerFieldDocumentWithRelations,
} from '../../mongose/models/soccer-field.model';
import { ScheduleDocument } from '../../mongose/models/schedule.model';
import { UserDocument } from '../../mongose/models/user.model';
import {
  TeamDocument,
  TeamDocumentWithRelationships,
  TeamModel,
} from '../../mongose/models/team.model';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDocumentWithRelations>;

  constructor(model: Model<MatchDocumentWithRelations>) {
    this.model = model;
  }

  async all(): Promise<Array<Match>> {
    const matchs = await this.model
      .find()
      .populate(['soccerField', 'players', 'schedules', 'teams'])
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
      .populate(['soccerField', 'players', 'schedules', 'teams'])
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
    const deletedMatch = await this.model
      .findByIdAndDelete(id)
      .populate(['soccerField', 'players', 'schedules', 'teams'])
      .exec();

    if (!deletedMatch) {
      return null;
    }

    return this.parseToEntity(deletedMatch);
  }

  async findById(id: string): Promise<Match | null> {
    const match = await this.model
      .findById(id)
      .populate(['soccerField', 'players', 'schedules', 'teams'])
      .exec();

    if (!match) throw Error('Partida não encontrada');
    if (!match.soccerField?._id)
      throw Error('Campo não encontrado! Verifique as informações da partida.');
    if (!match.schedules.length) throw Error('Sem horários na partida');

    return this.parseToEntity(match);
  }

  public parseToEntity(match: MatchDocumentWithRelations): Match | null {
    if (
      !match?.soccerField?._id ||
      !Array.isArray(match?.schedules) ||
      match.schedules.length === 0
    ) {
      return null;
    }

    const parsePlayers = (players?: PlayerDocument[]): Player[] =>
      (players ?? []).map(
        (player) =>
          new Player({
            id: player._id || uid(),
            name: player.name,
            stars: player?.stars,
            position: player.position,
          })
      );

    const parseSoccerField = (
      soccerField: SoccerFieldDocumentWithRelations
    ): SoccerField =>
      new SoccerField({
        id: soccerField?._id || uid(),
        name: soccerField.name,
        pixKey: soccerField.pixKey,
        rentalValue: soccerField.rentalValue,
        workDays: (soccerField?.workDays as Array<DayOfWeek>) ?? [],
        workStartTime: soccerField.workStartTime,
        workFinishTime: soccerField.workFinishTime,
        user: parseUser(soccerField.user),
      });

    const parseSchedules = (schedules: ScheduleDocument[]): Schedule[] =>
      schedules.map(
        (schedule) =>
          new Schedule({
            id: schedule._id || uid(),
            day: schedule.day,
            startTime: schedule.startTime,
            finishTime: schedule.finishTime,
          })
      );

    const parseUser = (user: UserDocument): User =>
      new User({
        id: user?._id ?? uid(),
        email: user.email,
        name: user.name,
        role: user.role,
        password: user.password,
        photoUrl: user.photoUrl,
      });

    const parseTeams = (teams?: TeamDocumentWithRelationships[]): Team[] => {
      return (teams ?? []).map((team: TeamDocumentWithRelationships) => {
        return new Team({
          id: team?._id ?? uid(),
          name: team.name,
          players: parsePlayers(team.players) ?? [],
        });
      });
    };

    return new Match({
      id: match._id || uid(),
      description: match.description,
      name: match.name,
      thumb: match.thumb,
      players: parsePlayers(match.players),
      soccerField: parseSoccerField(match.soccerField),
      schedules: parseSchedules(match.schedules),
      teams: parseTeams(match.teams),
      user: parseUser(match.user),
    });
  }
}
