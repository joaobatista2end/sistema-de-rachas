"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulePresenter = void 0;
const date_1 = require("../utils/date");
const SchedulePresenter = (schedule) => {
    return {
        id: schedule.id,
        day: (0, date_1.formatDate)(schedule.day),
        startTime: schedule.startTime.toString(),
        finishTime: schedule.finishTime.toString(),
    };
};
exports.SchedulePresenter = SchedulePresenter;
