import { uid } from 'uid';
import { describe, expect, it } from 'vitest';

import { Time } from '../object-values/time';
import { Match } from './match';
import { Player } from './player';
import { Schedule } from './schedule';
import { SoccerField } from './soccer-field';

const soccerField = new SoccerField({
  pixKey: uid(),
  rentalValue: 300,
});

const schedule = new Schedule({
  day: new Date(),
  startTime: new Time('10:30:00'),
  finishTime: new Time('16:30:00'),
});

const players = [
  new Player({ name: 'João', stars: 1 }),
  new Player({ name: 'Erick', stars: 2 }),
  new Player({ name: 'José', stars: 3 }),
  new Player({ name: 'Maria', stars: 4 }),
  new Player({ name: 'Ronaldinho', stars: 5 }),
  new Player({ name: 'Maradona', stars: 5 }),
];

describe('Testes relacionados ao Racha', () => {
  it('Verificar se os jogadores foram adicionados', () => {
    const match = new Match({ soccerField, schedule });
    const player = new Player({ name: 'João', stars: 2 });
    match.addPlayer(player);
    const searchedPlayer = match.getPlayer(player.id);

    expect(searchedPlayer?.id).equals(player.id);
  });
  it('Verificar se o pagamento do jogadores está funcionando', () => {
    const match = new Match({ soccerField, schedule });

    const playerJoao = new Player({ name: 'João', stars: 2 });
    const playerErick = new Player({ name: 'Erick', stars: 5 });
    match.addPlayer(playerJoao);
    match.addPlayer(playerErick);
    match.pay(playerErick.id);

    expect(playerErick.isPaid(match)).equals(true);
    expect(playerJoao.isPaid(match)).equals(false);
  });

  it('Verificar se a remoção de jogador está funcionando', () => {
    const match = new Match({ soccerField, schedule });
    match.addPlayer(players[0]);
    match.addPlayer(players[1]);
    match.addPlayer(players[2]);

    match.removePlayer(players[1].id);
    expect(match.players.length).equals(2);

    const playerDeleted = match.getPlayer(players[1].id);
    expect(playerDeleted).equals(undefined);
  });

  it('Verificar valor a ser pago pelos jogadores', () => {
    const match = new Match({ soccerField, schedule });

    match.addPlayer(players[0]);
    match.addPlayer(players[1]);
    match.addPlayer(players[2]);
    match.addPlayer(players[3]);

    expect(match.amountToBePaidPerPlayer).equals(450);
  });
});
