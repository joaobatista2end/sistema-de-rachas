"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoccerFieldPresenter = void 0;
const SoccerFieldPresenter = (soccerField) => {
    return {
        id: soccerField.id,
        pixKey: soccerField.pixKey,
        rentalValue: soccerField.rentalValue,
    };
};
exports.SoccerFieldPresenter = SoccerFieldPresenter;
