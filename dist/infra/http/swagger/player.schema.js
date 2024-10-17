"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayerSchema = void 0;
exports.createPlayerSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Name of the player' },
            stars: {
                type: 'number',
                description: 'Player’s rating in stars',
                minimum: 0,
            },
        },
        required: ['name', 'stars'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'ID of the created player' },
                name: { type: 'string', description: 'Name of the player' },
                stars: { type: 'number', description: 'Player’s rating in stars' },
            },
        },
    },
};
