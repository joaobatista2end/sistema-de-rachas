"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
class Match {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.players = (params === null || params === void 0 ? void 0 : params.players) || [];
        this.soccerField = params.soccerField;
        this.schedule = params.schedule;
        this.thumb = params.thumb;
        this.teams = [];
        this.paymentListPlayers = [];
    }
    get paymentPlayers() {
        return this.players.filter((player) => {
            return this.paymentListPlayers.includes(player.id);
        });
    }
    addPlayer(player) {
        this.players.push(player);
    }
    removePlayer(playerID) {
        const indexPlayer = this.players.findIndex((player) => player.id === playerID);
        if (indexPlayer !== -1) {
            this.players.splice(indexPlayer, 1);
        }
    }
    getPlayer(playerID) {
        return this.players.find((playerItem) => playerItem.id === playerID);
    }
    pay(playerID) {
        this.paymentListPlayers.push(playerID);
    }
    get amountToBePaidPerPlayer() {
        return ((this.schedule.totalHours * this.soccerField.rentalValue) /
            this.players.length);
    }
}
exports.Match = Match;
