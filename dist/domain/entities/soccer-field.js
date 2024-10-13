"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoccerField = void 0;
const time_1 = require("../object-values/time");
const day_of_week_1 = require("../utils/day-of-week");
const schedule_1 = require("./schedule");
class SoccerField {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.rentalValue = params.rentalValue;
        this.pixKey = params.pixKey;
        this.workDays = params.workDays;
        this.workStartTime = new time_1.Time(params.workStartTime);
        this.workFinishTime = new time_1.Time(params.workFinishTime);
    }
    getAvailableTimes(month) {
        const availableTimes = {};
        const year = new Date().getFullYear();
        const months = month !== undefined
            ? [month - 1]
            : Array.from({ length: 12 }, (_, i) => i);
        for (const m of months) {
            const daysInMonth = new Date(year, m + 1, 0).getDate();
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, m, day);
                const dayOfWeek = date.getDay();
                if (this.workDays.includes((0, day_of_week_1.convertNumberToDayOfWeek)(dayOfWeek))) {
                    let currentTime = new time_1.Time(this.workStartTime.toString());
                    const endTime = new time_1.Time(this.workFinishTime.toString());
                    const dayString = date.toLocaleDateString('pt-BR');
                    if (!availableTimes[dayString]) {
                        availableTimes[dayString] = [];
                    }
                    // Adicionar os horários disponíveis em intervalos de 1 hora
                    while (currentTime.isBefore(endTime)) {
                        const schedule = new schedule_1.Schedule({
                            id: `${date.getTime()}-${currentTime.toString()}`,
                            startTime: currentTime.toString(),
                            finishTime: currentTime.addHours(1).toString(),
                            day: date.toISOString().split('T')[0],
                        });
                        availableTimes[dayString].push(schedule);
                        currentTime = currentTime.addHours(1); // Avança uma hora
                    }
                }
            }
        }
        return availableTimes;
    }
}
exports.SoccerField = SoccerField;
