export class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(time: string) {
    const [hours, minutes, seconds] = time.split(':');
    this.hours = parseInt(hours);
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
  }

  get number(): number {
    return this.hours + (this.minutes / 60 + this.seconds / 3600);
  }

  toString(): string {
    return `${this.hours}:${this.minutes}:${this.seconds}`;
  }
}
