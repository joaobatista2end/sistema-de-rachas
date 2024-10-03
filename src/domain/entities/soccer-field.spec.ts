import { describe, it, expect } from 'vitest';
import { SoccerField, SoccerFieldParams } from './soccer-field';
import { Time } from '../object-values/time';
import { uid } from 'uid';

describe('SoccerField', () => {
  it('should return available times for the entire year', () => {
    const params: SoccerFieldParams = {
      id: uid(),
      name: 'Campo de teste 1',
      rentalValue: 100,
      pixKey: uid(),
      workDays: ['segunda', 'quarta', 'sexta'],
      workStartTime: '10:00:00',
      workFinishTime: '12:00:00',
    };

    const soccerField = new SoccerField(params);
    const availableTimes = soccerField.getAvailableTimes();

    expect(Object.keys(availableTimes).length).toBeGreaterThan(0);

    const exampleDateKey = Object.keys(availableTimes)[0];
    const exampleSchedules = availableTimes[exampleDateKey];

    expect(exampleSchedules.length).toBeGreaterThan(0);

    const exampleSchedule = exampleSchedules[0];
    expect(exampleSchedule).toHaveProperty('id');
    expect(exampleSchedule).toHaveProperty('startTime');
    expect(exampleSchedule).toHaveProperty('finishTime');
    expect(exampleSchedule).toHaveProperty('day');

    expect(exampleSchedule.startTime.toString()).toBe('10:00:00');
    expect(exampleSchedule.finishTime.toString()).toBe('11:00:00');
  });

  it('should return available times for a specific month', () => {
    const params: SoccerFieldParams = {
      id: uid(),
      name: 'Campo de teste 2',
      rentalValue: 100,
      pixKey: uid(),
      workDays: ['segunda', 'quarta', 'sexta'],
      workStartTime: '10:00:00',
      workFinishTime: '12:00:00',
    };

    const soccerField = new SoccerField(params);
    const availableTimes = soccerField.getAvailableTimes(2);
    expect(Object.keys(availableTimes).length).toBeGreaterThan(0);
    Object.keys(availableTimes).forEach((dateKey) => {
      const date = new Date(dateKey.split('/').reverse().join('-'));
      const month = date.getMonth() + 1;
      expect(month).toBe(2);
    });
  });

  it('should format time correctly', () => {
    const time = new Time('1:2:3');
    expect(time.toString()).toBe('01:02:03');

    const time2 = new Time('10:20:30');
    expect(time2.toString()).toBe('10:20:30');
  });
});
