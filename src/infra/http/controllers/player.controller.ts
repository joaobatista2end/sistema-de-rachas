import { FastifyReply, FastifyRequest } from 'fastify';

class PlayerController {
  async all(req: FastifyRequest, res: FastifyReply) {
    res.send({
      data: 'Lista de jogadores cadastrados',
    });
  }
}

export default new PlayerController();
