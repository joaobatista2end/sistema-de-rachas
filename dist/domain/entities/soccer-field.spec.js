"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const soccer_field_1 = require("./soccer-field");
const time_1 = require("../object-values/time");
const uid_1 = require("uid");
(0, vitest_1.describe)('SoccerField', () => {
    (0, vitest_1.it)('should return available times for the entire year', () => {
        const params = {
            id: (0, uid_1.uid)(),
            name: 'Campo de teste 1',
            rentalValue: 100,
            pixKey: (0, uid_1.uid)(),
            workDays: ['segunda', 'quarta', 'sexta'],
            workStartTime: '10:00:00',
            workFinishTime: '12:00:00',
        };
        const soccerField = new soccer_field_1.SoccerField(params);
        const availableTimes = soccerField.getAvailableTimes();
        (0, vitest_1.expect)(Object.keys(availableTimes).length).toBeGreaterThan(0);
        const exampleDateKey = Object.keys(availableTimes)[0];
        const exampleSchedules = availableTimes[exampleDateKey];
        (0, vitest_1.expect)(exampleSchedules.length).toBeGreaterThan(0);
        const exampleSchedule = exampleSchedules[0];
        (0, vitest_1.expect)(exampleSchedule).toHaveProperty('id');
        (0, vitest_1.expect)(exampleSchedule).toHaveProperty('startTime');
        (0, vitest_1.expect)(exampleSchedule).toHaveProperty('finishTime');
        (0, vitest_1.expect)(exampleSchedule).toHaveProperty('day');
        (0, vitest_1.expect)(exampleSchedule.startTime.toString()).toBe('10:00:00');
        (0, vitest_1.expect)(exampleSchedule.finishTime.toString()).toBe('11:00:00');
    });
    (0, vitest_1.it)('should return available times for a specific month', () => {
        const params = {
            id: (0, uid_1.uid)(),
            name: 'Campo de teste 2',
            rentalValue: 100,
            pixKey: (0, uid_1.uid)(),
            workDays: ['segunda', 'quarta', 'sexta'],
            workStartTime: '10:00:00',
            workFinishTime: '12:00:00',
        };
        const soccerField = new soccer_field_1.SoccerField(params);
        const availableTimes = soccerField.getAvailableTimes(2);
        (0, vitest_1.expect)(Object.keys(availableTimes).length).toBeGreaterThan(0);
        Object.keys(availableTimes).forEach((dateKey) => {
            const date = new Date(dateKey.split('/').reverse().join('-'));
            const month = date.getMonth() + 1;
            (0, vitest_1.expect)(month).toBe(2);
        });
    });
    (0, vitest_1.it)('should format time correctly', () => {
        const time = new time_1.Time('1:2:3');
        (0, vitest_1.expect)(time.toString()).toBe('01:02:03');
        const time2 = new time_1.Time('10:20:30');
        (0, vitest_1.expect)(time2.toString()).toBe('10:20:30');
    });
});
