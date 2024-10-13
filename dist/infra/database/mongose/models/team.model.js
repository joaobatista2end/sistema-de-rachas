"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamSchema = void 0;
const mongoose_1 = require("mongoose");
exports.teamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    players: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Player',
        },
    ],
    minPlayers: {
        type: Number,
        default: 6,
    },
    maxPlayers: {
        type: Number,
        default: 12,
    },
});
const TeamModel = (0, mongoose_1.model)('team', exports.teamSchema);
exports.default = TeamModel;
