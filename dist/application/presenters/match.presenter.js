"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchPresenter = void 0;
const player_presenter_1 = require("./player.presenter");
const schedule_presenter_1 = require("./schedule.presenter");
const soccer_field_presenter_1 = require("./soccer-field.presenter");
const MatchPresenter = (match) => {
    if (!match)
        return match;
    return {
        id: match.id,
        name: match.name,
        description: match.description,
        thumb: match.thumb,
        players: match.players.map((player) => (0, player_presenter_1.PlayerPresenter)(player)),
        schedule: (0, schedule_presenter_1.SchedulePresenter)(match.schedule),
        soccerField: (0, soccer_field_presenter_1.SoccerFieldPresenter)(match.soccerField),
    };
};
exports.MatchPresenter = MatchPresenter;
