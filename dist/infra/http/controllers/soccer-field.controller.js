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
const register_soccer_field_usecase_1 = require("../../../domain/use-cases/soccer-field/register-soccer-field.usecase");
const soccer_field_presenter_1 = require("../../../application/presenters/soccer-field.presenter");
const fetch_soccer_field_usecase_1 = require("../../../domain/use-cases/soccer-field/fetch-soccer-field.usecase");
const get_soccer_field_available_times_1 = require("../../../domain/use-cases/soccer-field/get-soccer-field-available-times");
class SoccerFieldController {
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerFields = yield fetch_soccer_field_usecase_1.FetchSoccerFieldUseCase.execute();
            res.send({
                soccerFields,
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerFieldDto = req.body;
            const soccerField = yield register_soccer_field_usecase_1.RegisterSoccerFieldUseCase.execute(soccerFieldDto);
            res.send({
                data: soccerField !== null ? (0, soccer_field_presenter_1.SoccerFieldPresenter)(soccerField) : {},
            });
        });
    }
    availableTimes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { month } = req.query;
            const availableTimes = yield get_soccer_field_available_times_1.GetSoccerFieldAvailableTimes.execute(id, month);
            return {
                data: availableTimes,
            };
        });
    }
}
exports.default = new SoccerFieldController();
