import { FastifyRequest, FastifyReply } from 'fastify';
import SoccerFieldModel from '../../database/mongose/models/soccer-field.model';

interface Params {
  id: string;
}

const soccerFieldController = {
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, rentalValue, pixKey, workStartTime, workFinishTime, workDays } = request.body as {
        name: string;
        rentalValue: number;
        pixKey: string;
        workStartTime: string; // Adicione este campo
        workFinishTime: string; // Adicione este campo
        workDays: string[];     // Adicione este campo
      };
  
      const newField = new SoccerFieldModel({
        name,
        rentalValue,
        pixKey,
        workStartTime,   // Inclua este campo
        workFinishTime,  // Inclua este campo
        workDays         // Inclua este campo
      });
  
      await newField.save();
      reply.code(201).send({ message: 'Campo registrado com sucesso!' });
    } catch (error) {
      reply
        .code(500)
        .send({ error: 'Erro ao registrar campo', details: error });
    }
  },

  async all(request: FastifyRequest, reply: FastifyReply) {
    try {
      const fields = await SoccerFieldModel.find();
      reply.send(fields);
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao buscar campos', details: error });
    }
  },

  async availableTimes(
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    try {
      const field = await SoccerFieldModel.findById(request.params.id);
      if (!field) {
        reply.code(404).send({ message: 'Campo não encontrado' });
        return;
      }
      // Implement logic to return available times for the field.
    } catch (error) {
      reply
        .code(500)
        .send({ error: 'Erro ao buscar horários disponíveis', details: error });
    }
  },
};

export default soccerFieldController;
