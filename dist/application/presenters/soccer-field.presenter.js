"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoccerFieldPresenter = void 0;
const SoccerFieldPresenter = (soccerField) => {
    return {
        id: soccerField.id,
        name: soccerField.name,
        pixKey: soccerField.pixKey,
        rentalValue: soccerField.rentalValue,
        workDays: soccerField.workDays,
        workFinishTime: soccerField.workFinishTime.toString(),
        workStartTime: soccerField.workStartTime.toString(),
    };
};
exports.SoccerFieldPresenter = SoccerFieldPresenter;
