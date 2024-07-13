import PlayerModel, {
  PlayerDto,
} from '../../../infra/database/mongose/models/player.model';
import { PlayerMongoRepository } from '../../../infra/database/mongose/repositories/player.repository';
import { PlayerRepository } from '../../../infra/database/repositories/player.respository';

export class RegisterPlayerUseCase {
  private static repository: PlayerRepository = new PlayerMongoRepository(
    PlayerModel
  );

  static async execute(playerDto: PlayerDto) {
    const registredPlayer = await RegisterPlayerUseCase.repository.create(
      playerDto
    );
    return registredPlayer;
  }
}
