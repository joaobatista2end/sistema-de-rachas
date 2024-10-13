"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchMongoRepository = void 0;
const schedule_repository_1 = require("./schedule.repository");
const schedule_model_1 = require("../../mongose/models/schedule.model");
const match_1 = require("../../../../domain/entities/match");
const player_1 = require("../../../../domain/entities/player");
const soccer_field_1 = require("../../../../domain/entities/soccer-field");
const schedule_1 = require("../../../../domain/entities/schedule");
const uid_1 = require("uid");
class MatchMongoRepository {
    constructor(model) {
        this.model = model;
        this.scheduleRepository = new schedule_repository_1.ScheduleMongoRepository(schedule_model_1.ScheduleModel);
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const matchs = yield this.model
                .find()
                .populate(['soccerField', 'players', 'schedule'])
                .exec();
            return matchs
                .map((match) => this.parseToEntity(match))
                .filter((match) => match !== null);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const schedule = yield this.scheduleRepository.create(data.schedule);
            if (!schedule)
                throw Error('Erro ao criar agendamento da partida');
            const match = new this.model(Object.assign(Object.assign({}, data), { schedule: schedule.id }));
            yield match.save();
            return this.findById(match._id);
        });
    }
    update(id, data) {
        throw new Error('Method not implemented.');
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const match = yield this.model
                .findById(id)
                .populate(['soccerField', 'players', 'schedule'])
                .exec();
            if (!match)
                throw Error('Partida não encontrada');
            if (!((_a = match.soccerField) === null || _a === void 0 ? void 0 : _a._id))
                throw Error('É necessário especificiar o campo');
            if (!((_b = match.schedule) === null || _b === void 0 ? void 0 : _b._id))
                throw Error('É necessário especificiar o campo');
            return this.parseToEntity(match);
        });
    }
    parseToEntity(match) {
        var _a, _b, _c, _d;
        if (!((_a = match === null || match === void 0 ? void 0 : match.soccerField) === null || _a === void 0 ? void 0 : _a._id) || !((_b = match === null || match === void 0 ? void 0 : match.schedule) === null || _b === void 0 ? void 0 : _b._id)) {
            return null;
        }
        return new match_1.Match({
            id: match._id || (0, uid_1.uid)(),
            description: match.description,
            name: match.name,
            thumb: match.thumb,
            players: ((match === null || match === void 0 ? void 0 : match.players) || []).map((player) => {
                return (new player_1.Player({
                    id: player._id || (0, uid_1.uid)(),
                    name: player.name,
                    stars: player.stars,
                }) || []);
            }),
            soccerField: new soccer_field_1.SoccerField({
                id: ((_c = match.soccerField) === null || _c === void 0 ? void 0 : _c._id) || (0, uid_1.uid)(),
                name: match.soccerField.name,
                pixKey: match.soccerField.pixKey,
                rentalValue: match.soccerField.rentalValue,
                workDays: match.soccerField.workDays.map((day) => day),
                workStartTime: match.soccerField.workStartTime,
                workFinishTime: match.soccerField.workFinishTime,
            }),
            schedule: new schedule_1.Schedule({
                id: ((_d = match.schedule) === null || _d === void 0 ? void 0 : _d._id) || (0, uid_1.uid)(),
                day: match.schedule.day,
                startTime: match.schedule.startTime,
                finishTime: match.schedule.finishTime,
            }),
        });
    }
}
exports.MatchMongoRepository = MatchMongoRepository;
