"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
class Time {
    constructor(time) {
        const [hours, minutes, seconds] = time.split(':');
        this.hours = parseInt(hours);
        this.minutes = parseInt(minutes);
        this.seconds = parseInt(seconds);
    }
    // Converte o tempo para o total em segundos, para facilitar as comparações
    toSeconds() {
        return this.hours * 3600 + this.minutes * 60 + this.seconds;
    }
    // Compara se o tempo atual é anterior ao tempo passado como parâmetro
    isBefore(otherTime) {
        return this.toSeconds() < otherTime.toSeconds();
    }
    // Compara se o tempo atual é posterior ao tempo passado como parâmetro
    isAfter(otherTime) {
        return this.toSeconds() > otherTime.toSeconds();
    }
    get number() {
        return this.hours + (this.minutes / 60 + this.seconds / 3600);
    }
    toString() {
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
    // Método para adicionar horas ao tempo
    addHours(hours) {
        const totalSeconds = this.toSeconds() + hours * 3600;
        const newHours = Math.floor(totalSeconds / 3600) % 24;
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        return new Time(`${newHours}:${newMinutes}:${newSeconds}`);
    }
}
exports.Time = Time;
