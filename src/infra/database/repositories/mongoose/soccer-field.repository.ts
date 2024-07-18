import { Model } from 'mongoose';
import { SoccerFieldRepository } from '../../repositories/soccer-field.repository';
import {
  CreateSoccerFieldDto,
  SoccerFieldDto,
} from '../../../../domain/dto/soccer-field.dto';
import { SoccerFieldDocument } from '../../mongose/models/soccer-field.model';
import { SoccerField } from '../../../../domain/entities/soccer-field';
export class SoccerFieldMongoRepository implements SoccerFieldRepository {
  private model: Model<SoccerFieldDocument>;

  constructor(model: Model<SoccerFieldDocument>) {
    this.model = model;
  }

  async findById(id: string): Promise<SoccerField | null> {
    const soccerField = await this.model.findById(id).exec();
    if (!soccerField) return null;

    return new SoccerField({
      id: soccerField._id,
      pixKey: soccerField.pixKey,
      rentalValue: soccerField.rentalValue,
    });
  }

  async findByName(name: string): Promise<SoccerField | null> {
    const soccerField = await this.model.findOne({ name }).exec();
    if (!soccerField) return null;

    return new SoccerField({
      id: soccerField._id,
      pixKey: soccerField.pixKey,
      rentalValue: soccerField.rentalValue,
    });
  }

  async create(soccerField: CreateSoccerFieldDto): Promise<void> {
    new this.model(soccerField);
  }

  async update(
    id: string,
    payload: Partial<SoccerFieldDto>
  ): Promise<SoccerField | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!updated) return null;
    return new SoccerField({
      id: updated._id,
      pixKey: updated.pixKey,
      rentalValue: updated.rentalValue,
    });
  }

  async delete(id: string): Promise<void | null> {
    this.model.findByIdAndDelete(id).exec();
  }
}
