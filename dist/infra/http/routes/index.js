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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const match_controller_1 = __importDefault(require("../controllers/match.controller"));
const player_controller_1 = __importDefault(require("../controllers/player.controller"));
const soccer_field_controller_1 = __importDefault(require("../controllers/soccer-field.controller"));
const routes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post('/player', player_controller_1.default.register.bind(player_controller_1.default));
    // Match
    fastify.post('/match', match_controller_1.default.register.bind(match_controller_1.default));
    fastify.get('/match', match_controller_1.default.all.bind(match_controller_1.default));
    fastify.put('/match/:id', match_controller_1.default.update.bind(match_controller_1.default));
    fastify.get('/match/:id', match_controller_1.default.findById.bind(match_controller_1.default));
    fastify.get('/match/:id/amount-paid-players', match_controller_1.default.getAmountPaidPlayer.bind(match_controller_1.default));
    fastify.post('/soccer-field', soccer_field_controller_1.default.register.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field', soccer_field_controller_1.default.all.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field/:id', soccer_field_controller_1.default.availableTimes.bind(soccer_field_controller_1.default));
});
exports.default = routes;
