import { uid } from 'uid';
import { describe, expect, it } from 'vitest';

import { Match } from './match';
import { Player } from './player';
import { SoccerField } from './soccer-field';

const soccerField = new SoccerField({
  pixKey: uid(),
  rentalValue: 300,
});


describe('Testes relacionados ao Racha', () => {
  it('Verificar se os jogadores foram adicionados', () => {
    const match = new Match({ soccerField });
    const player = new Player({ name: 'João', stars: 2 });
    match.addPlayer(player);
    const searchedPlayer = match.getPlayer(player.id);

    expect(searchedPlayer?.id).equals(player.id);
  });
  it('Verificar se o pagamento do jogadores está funcionando', () => {
    const match = new Match({ soccerField });
    match.schedule = {
      day: new Date(),
      startTime: '10:30:00',
      finishTime: '16:30:00',
    };

    console.log({ schedule: match.schedule });
    const playerJoao = new Player({ name: 'João', stars: 2 });
    const playerErick = new Player({ name: 'Erick', stars: 5 });
    match.addPlayer(playerJoao);
    match.addPlayer(playerErick);
    match.pay(playerErick.id);

    expect(playerErick.isPaid(match)).equals(true);
    expect(playerJoao.isPaid(match)).equals(false);
  });

  it('Verificar valor a ser pago pelos jogadores', () => {
    const match = new Match({ soccerField });
    const playerJoao = new Player({ name: 'João', stars: 2 });
    const playerErick = new Player({ name: 'Erick', stars: 5 });
    const playerJose = new Player({ name: 'José', stars: 4 });
    match.addPlayer(playerJoao);
    match.addPlayer(playerErick);
    match.addPlayer(playerJose);

    expect(match.amountToBePaidPerPlayer).equals(100);
  });

  
});

