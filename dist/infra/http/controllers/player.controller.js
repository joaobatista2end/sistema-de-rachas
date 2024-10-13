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
const register_player_usecase_1 = require("../../../domain/use-cases/player/register-player.usecase");
const http_status_code_1 = require("../../../domain/enums/http-status-code");
const player_presenter_1 = require("../../../application/presenters/player.presenter");
class PlayerController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerDto = req.body;
            const result = yield register_player_usecase_1.RegisterPlayerUseCase.execute(playerDto);
            if (result) {
                res.status(http_status_code_1.HttpStatusCode.CREATED).send((0, player_presenter_1.PlayerPresenter)(result));
            }
            else {
                res.status(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                    message: 'Erro ao criar jogador',
                });
            }
        });
    }
}
exports.default = new PlayerController();
