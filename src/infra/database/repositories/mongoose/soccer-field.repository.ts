import { Model } from 'mongoose';
import { SoccerFieldRepository } from '../../repositories/soccer-field.repository';
import {
  CreateSoccerFieldDto,
  SoccerFieldDto,
} from '../../../../domain/dto/soccer-field.dto';
import { SoccerFieldDocumentWithRelations } from '../../mongose/models/soccer-field.model';
import { SoccerField } from '../../../../domain/entities/soccer-field';
import { DayOfWeek } from '../../../../domain/object-values/day';
import { User } from '../../../../domain/entities/user';
import MatchModel from '../../mongose/models/match.model';
import { ScheduleDocument } from '../../mongose/models/schedule.model';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { transformSchedulesToDateRange } from '../../../../application/utils/date';
import { MatchPresenter } from '../../../../application/presenters/match.presenter';
import { convertNumberToDayOfWeek } from '../../../../domain';

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export class SoccerFieldMongoRepository implements SoccerFieldRepository {
  private model: Model<SoccerFieldDocumentWithRelations>;

  constructor(model: Model<SoccerFieldDocumentWithRelations>) {
    this.model = model;
  }

  async getAvailableTimes(
    id: string,
    day?: string
  ): Promise<ScheduleDocument[]> {
    const currentDay = day ?? new Date().toISOString();

    const soccerField = await this.model.findById(id).exec();
    if (!soccerField) {
      throw new Error('Campo de futebol não encontrado');
    }

    const matchs = await MatchModel.find()
      .populate(['soccerField', 'players', 'schedules'])
      .find({
        schedules: {
          $elemMatch: {
            day: { $gte: new Date(currentDay).toISOString() },
          },
        },
        soccerField: id,
      })
      .exec();

    const occupiedTimes: { startTime: string; finishTime: string }[] = [];
    matchs.forEach((match) => {
      match.schedules.forEach((schedule) => {
        if (schedule.day === currentDay) {
          occupiedTimes.push({
            startTime: schedule.startTime,
            finishTime: schedule.finishTime,
          });
        }
      });
    });

    return matchs.map((match) => match.schedules).flat();
  }

  private getWorkTimes(soccerField: SoccerFieldDocumentWithRelations) {
    const currentDayIndex = dayjs().day();
    const dayOfWeek = convertNumberToDayOfWeek(currentDayIndex);

    if (soccerField.workDays.includes(dayOfWeek)) {
      return [];
    }

    soccerField.workStartTime;
    soccerField.workFinishTime;
  }

  async all(): Promise<Array<SoccerField>> {
    const soccerFields = await this.model.find().populate(['user']).exec();
    return soccerFields.map((soccerField) => {
      return this.parseToEntity(soccerField);
    });
  }

  async allByUser(userId: string): Promise<Array<SoccerField>> {
    const soccerFields = await this.model
      .where('user')
      .equals(userId)
      .populate(['user'])
      .exec();

    return soccerFields.map((soccerField) => {
      return this.parseToEntity(soccerField);
    });
  }

  async findById(id: string): Promise<SoccerField | null> {
    const soccerField = await this.model.findById(id).populate(['user']).exec();
    if (!soccerField) return null;

    return this.parseToEntity(soccerField);
  }

  async findByName(name: string): Promise<SoccerField | null> {
    const soccerField = await this.model.findOne({ name }).exec();
    if (!soccerField) return null;

    return this.parseToEntity(soccerField);
  }

  async create(data: CreateSoccerFieldDto): Promise<SoccerField | null> {
    const soccerField = new this.model(data);
    await soccerField.save();

    if (!soccerField) return null;

    return this.parseToEntity(soccerField);
  }

  async update(
    id: string,
    payload: Partial<CreateSoccerFieldDto>
  ): Promise<SoccerField | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, payload, { new: true })
      .populate(['user'])
      .exec();

    if (!updated) return null;

    return this.parseToEntity(updated);
  }

  async delete(id: string): Promise<SoccerField | null> {
    const deletedSoccerField = await this.model.findByIdAndDelete(id).exec();

    if (!deletedSoccerField) {
      return null;
    }

    return this.parseToEntity(deletedSoccerField);
  }

  private parseToEntity(
    document: SoccerFieldDocumentWithRelations
  ): SoccerField {
    return new SoccerField({
      id: document._id as string,
      name: document.name,
      pixKey: document.pixKey,
      rentalValue: document.rentalValue,
      workFinishTime: document.workFinishTime,
      workStartTime: document.workStartTime,
      workDays: document.workDays as DayOfWeek[],
      user: new User({
        email: document.user.email,
        id: document.user._id as string,
        name: document.user.name,
        password: document.user.password,
        photoUrl: document.user.photoUrl,
        role: document.user.role,
      }),
    });
  }
}
