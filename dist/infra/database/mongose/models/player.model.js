"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.playerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
});
const PlayerModel = (0, mongoose_1.model)('player', exports.playerSchema);
exports.default = PlayerModel;
