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
    get number() {
        return this.hours + (this.minutes / 60 + this.seconds / 3600);
    }
    toString() {
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
    }
}
exports.Time = Time;
