import PlayerModel, {
  PlayerDocument,
} from '../../../infra/database/mongose/models/player.model';
import { PlayerMongoRepository } from '../../../infra/database/repositories/mongoose/player.repository';
import { PlayerRepository } from '../../../infra/database/repositories/player.respository';
import { CreatePlayerDto, PlayerDto } from '../../dto/player.dto';

export class RegisterPlayerUseCase {
  private static repository: PlayerRepository = new PlayerMongoRepository(
    PlayerModel
  );

  static async execute(playerDto: CreatePlayerDto) {
    const registredPlayer = await RegisterPlayerUseCase.repository.create(
      playerDto
    );
    return registredPlayer;
  }
}
