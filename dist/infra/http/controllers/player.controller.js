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
class PlayerController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerDto = req.body;
            const player = yield register_player_usecase_1.RegisterPlayerUseCase.execute(playerDto);
            res.send({
                data: player,
            });
        });
    }
}
exports.default = new PlayerController();
