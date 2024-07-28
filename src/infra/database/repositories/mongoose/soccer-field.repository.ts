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

  async all(): Promise<Array<SoccerField>> {
    const soccerFields = await this.model.find();

    return soccerFields.map((soccerField) => {
      return new SoccerField({
        id: soccerField._id,
        pixKey: soccerField.pixKey,
        rentalValue: soccerField.rentalValue,
      });
    });
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

  async create(data: CreateSoccerFieldDto): Promise<SoccerField | null> {
    const created = new this.model(data);
    await created.save();

    if (!created) return null;
    return this.parseToEntity(created);
  }

  async update(
    id: string,
    payload: Partial<SoccerFieldDto>
  ): Promise<SoccerField | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!updated) return null;
    return this.parseToEntity(updated);
  }

  async delete(id: string): Promise<void | null> {
    this.model.findByIdAndDelete(id).exec();
  }

  private parseToEntity(document: SoccerFieldDocument): SoccerField {
    return new SoccerField({
      id: document._id as string,
      pixKey: document.pixKey,
      rentalValue: document.rentalValue,
    });
  }
}
