import { describe, expect, it } from 'vitest';

import { Time } from './time';

describe('Testes da classe Time', () => {
  it('Validando conversão de time para numero', () => {
    const time = new Time('10:30:00');
    const time2 = new Time('0:30:00');

    expect(time.number).equals(10.5);
    expect(time2.number).equals(0.5);
  });
});
