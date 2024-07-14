import { Match } from '../../entities/match';

export class RegisterMatchUseCase {
  private repository = new MatchRepository();
  private execute(): Match {}
}
