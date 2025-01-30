import mongoose, { Model } from 'mongoose';
import { MatchRepository } from '../../repositories/match.repository';
import { CreateMatchDto } from '../../../../domain/dto/match.dto';
import MatchModel, {
  MatchDocumentWithRelations,
} from '../../mongose/models/match.model';
import { Match } from '../../../../domain/entities/match';
import { Player } from '../../../../domain/entities/player';
import { SoccerField } from '../../../../domain/entities/soccer-field';
import { Schedule } from '../../../../domain/entities/schedule';
import { uid } from 'uid';
import { DayOfWeek } from '../../../../domain/object-values/day';
import { CreateTeamDto, Team, User } from '../../../../domain';
import { PlayerDocument } from '../../mongose/models/player.model';
import SoccerFieldModel, {
  SoccerFieldDocumentWithRelations,
} from '../../mongose/models/soccer-field.model';
import { ScheduleDocument } from '../../mongose/models/schedule.model';
import { UserDocument } from '../../mongose/models/user.model';
import { TeamDocumentWithRelationships } from '../../mongose/models/team.model';
import PaymentModel from '../../mongose/models/payment.model';
import { PaymentMongoRepository } from './payment.repository';
import { SoccerFieldMongoRepository } from './soccer-field.repository';

export class MatchMongoRepository implements MatchRepository {
  private model: Model<MatchDocumentWithRelations>;
  private paymentRepository: PaymentMongoRepository;

  constructor(model: Model<MatchDocumentWithRelations>) {
    this.model = model;
    this.paymentRepository = new PaymentMongoRepository(PaymentModel);
  }

  async all(): Promise<Array<Match>> {
    const matchs = await this.model
      .find()
      .populate(['soccerField', 'players', 'schedules', 'teams'])
      .exec();
    const parsedMatches = await Promise.all(
      matchs.map((match) => this.parseToEntity(match))
    );
    return parsedMatches.filter((match) => match !== null) as Match[];
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
  async findUnpaidMatchesByUser(userId: string): Promise<Match[]> {
    const unpaidMatches = await this.model.aggregate([
      {
        $lookup: {
          from: 'payments',
          localField: '_id',
          foreignField: 'match',
          as: 'payments',
        },
      },
      {
        $match: {
          payments: { $size: 0 }, // Filtra partidas sem pagamentos
          user: new mongoose.Types.ObjectId(userId), // Filtra partidas do usuário
        },
      },
      {
        $lookup: {
          from: 'soccerfields', // Nome da coleção de campos
          localField: 'soccerField', // Campo na coleção de partidas que referencia o campo
          foreignField: '_id', // Campo na coleção de campos que é referenciado
          as: 'soccerField', // Nome do campo que armazenará os dados do campo
        },
      },
      {
        $unwind: {
          path: '$soccerField',
          preserveNullAndEmptyArrays: true, // Mantém documentos mesmo se o soccerField não existir
        },
      },
      {
        $lookup: {
          from: 'schedules', // Nome da coleção de schedules
          localField: 'schedules', // Campo na coleção de partidas que referencia os schedules
          foreignField: '_id', // Campo na coleção de schedules que é referenciado
          as: 'schedules', // Nome do campo que armazenará os dados dos schedules
        },
      },
      {
        $lookup: {
          from: 'users', // Nome da coleção de usuários
          localField: 'user', // Campo na coleção de partidas que referencia o usuário
          foreignField: '_id', // Campo na coleção de usuários que é referenciado
          as: 'user', // Nome do campo que armazenará os dados do usuário
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true, // Mantém documentos mesmo se o user não existir
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          thumb: 1,
          description: 1,
          players: 1,
          teams: 1,
          soccerField: 1, // Inclui os dados do campo
          user: 1, // Inclui os dados do usuário
          schedules: {
            $map: {
              input: '$schedules',
              as: 'schedule',
              in: {
                _id: '$$schedule._id',
                startTime: '$$schedule.startTime',
                finishTime: '$$schedule.finishTime',
                day: '$$schedule.day',
              },
            },
          },
        },
      },
    ]);

    console.log('Unpaid Matches:', JSON.stringify(unpaidMatches, null, 2)); // Log para verificar os dados

    return this.parseToEntities(unpaidMatches);
  }

  private async parseToEntities(matches: any[]): Promise<Match[]> {
    return matches.map((match) => new Match(match));
  }

  public async parseToEntity(
    match: MatchDocumentWithRelations
  ): Promise<Match | null> {
    console.log('Match Document:', JSON.stringify(match, null, 2)); // Log para verificar o documento

    if (
      !match?.soccerField?._id ||
      !Array.isArray(match?.schedules) ||
      match.schedules.length === 0
    ) {
      console.log('Schedules is empty or not an array:', match.schedules); // Log específico para schedules
      return null;
    }

    const payment = match._id
      ? await this.paymentRepository.findByMatch(match._id.toString())
      : null;

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
    ): SoccerField => {
      console.log('Parsing SoccerField:', soccerField); // Log para verificar o soccerField
      return new SoccerField({
        id: soccerField?._id || uid(),
        name: soccerField.name,
        pixKey: soccerField.pixKey,
        rentalValue: soccerField.rentalValue,
        workDays: (soccerField?.workDays as Array<DayOfWeek>) ?? [],
        workStartTime: soccerField.workStartTime,
        workFinishTime: soccerField.workFinishTime,
        user: parseUser(soccerField.user),
      });
    };

    const parseSchedules = (schedules: any[]): Schedule[] => {
      console.log('Parsing Schedules:', schedules); // Log para verificar os schedules antes de parsear
      return schedules.map(
        (schedule) =>
          new Schedule({
            id: schedule._id || uid(),
            day: schedule.day,
            startTime: schedule.startTime,
            finishTime: schedule.finishTime,
          })
      );
    };

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
      payment: !payment ? undefined : payment,
      players: parsePlayers(match.players),
      soccerField: parseSoccerField(match.soccerField), // Parseia o soccerField
      schedules: parseSchedules(match.schedules), // Parseia os schedules
      teams: parseTeams(match.teams),
      user: parseUser(match.user),
    });
  }
}
