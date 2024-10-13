"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soccerFieldSchema = void 0;
const mongoose_1 = require("mongoose");
exports.soccerFieldSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    pixKey: {
        type: String,
        required: true,
    },
    workDays: {
        type: (Array),
        required: true,
    },
    workStartTime: {
        type: String,
        required: true,
    },
    workFinishTime: {
        type: String,
        required: true,
    },
    rentalValue: {
        type: Number,
        required: true,
    },
});
const SoccerFieldModel = (0, mongoose_1.model)('soccer-field', exports.soccerFieldSchema);
exports.default = SoccerFieldModel;
