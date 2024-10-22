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
export class SoccerFieldMongoRepository implements SoccerFieldRepository {
  private model: Model<SoccerFieldDocumentWithRelations>;

  constructor(model: Model<SoccerFieldDocumentWithRelations>) {
    this.model = model;
  }

  async all(userId: string): Promise<Array<SoccerField>> {
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

  async delete(id: string): Promise<void | null> {
    this.model.findByIdAndDelete(id).exec();
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
