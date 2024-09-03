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
const get_amount_paid_player_usecase_1 = require("../../../domain/use-cases/match/get-amount-paid-player.usecase");
const register_match_usecase_1 = require("../../../domain/use-cases/match/register-match.usecase");
const update_match_usecase_1 = require("../../../domain/use-cases/match/update-match.usecase");
const find_match_usecase_1 = require("../../../domain/use-cases/match/find-match.usecase");
const match_presenter_1 = require("../../../application/presenters/match.presenter");
const fetch_match_usecase_1 = require("../../../domain/use-cases/match/fetch-match.usecase");
class MatchController {
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchs = yield fetch_match_usecase_1.FetchMatchUseCase.execute();
            res.send({
                data: matchs,
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield register_match_usecase_1.RegisterMatchUseCase.execute(req.body);
            res.send({
                data: (0, match_presenter_1.MatchPresenter)(match),
            });
        });
    }
    getAmountPaidPlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const total = get_amount_paid_player_usecase_1.GetAmountPaidPlayerUseCase.execute(id);
            res.send({
                data: {
                    total,
                },
            });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const match = yield find_match_usecase_1.FindMatchUseCase.execute(id);
            res.send({
                data: (0, match_presenter_1.MatchPresenter)(match),
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const matchDto = req.body;
            const updated = update_match_usecase_1.UpdateMatchUseCase.execute(id, matchDto);
            res.send({
                data: updated,
            });
        });
    }
}
exports.default = new MatchController();
