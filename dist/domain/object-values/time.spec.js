"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const time_1 = require("./time");
(0, vitest_1.describe)('Testes da classe Time', () => {
    (0, vitest_1.it)('Validando conversão de time para numero', () => {
        const time = new time_1.Time('10:30:00');
        const time2 = new time_1.Time('12:30:00');
        (0, vitest_1.expect)(time.number).equals(10.5);
        (0, vitest_1.expect)(time2.number).equals(12.5);
    });
});
