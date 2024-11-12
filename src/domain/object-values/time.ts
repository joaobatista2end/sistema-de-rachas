type TimeParam = 'hours' | 'minutes' | 'seconds';

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

  // Converte o tempo para o total em segundos, para facilitar as comparações
  public toSeconds(): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds;
  }

  public add(timeParam: TimeParam, value: number): Time {
    const totalSeconds =
      this.toSeconds() +
      (timeParam === 'hours'
        ? value * 3600
        : timeParam === 'minutes'
        ? value * 60
        : value);
    const newHours = Math.floor(totalSeconds / 3600) % 24; // Garantir que horas fiquem no intervalo 0-23
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSeconds = totalSeconds % 60;

    return new Time(`${newHours}:${newMinutes}:${newSeconds}`);
  }

  // Compara se o tempo atual é anterior ao tempo passado como parâmetro
  public isBefore(otherTime: Time): boolean {
    return this.toSeconds() < otherTime.toSeconds();
  }

  // Compara se o tempo atual é posterior ao tempo passado como parâmetro
  public isAfter(otherTime: Time): boolean {
    return this.toSeconds() > otherTime.toSeconds();
  }

  public isEqual(otherTime: Time): boolean {
    return this.toSeconds() === otherTime.toSeconds();
  }

  get number(): number {
    return this.hours + (this.minutes / 60 + this.seconds / 3600);
  }

  toString(): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
  }

  // Método para adicionar horas ao tempo
  public addHours(hours: number): Time {
    const totalSeconds = this.toSeconds() + hours * 3600;
    const newHours = Math.floor(totalSeconds / 3600) % 24;
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newSeconds = totalSeconds % 60;
    return new Time(`${newHours}:${newMinutes}:${newSeconds}`);
  }
}
