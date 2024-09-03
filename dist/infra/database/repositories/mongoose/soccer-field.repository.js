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
exports.SoccerFieldMongoRepository = void 0;
const soccer_field_1 = require("../../../../domain/entities/soccer-field");
class SoccerFieldMongoRepository {
    constructor(model) {
        this.model = model;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerFields = yield this.model.find();
            return soccerFields.map((soccerField) => {
                return new soccer_field_1.SoccerField({
                    id: soccerField._id,
                    pixKey: soccerField.pixKey,
                    rentalValue: soccerField.rentalValue,
                    workFinishTime: soccerField.workFinishTime,
                    workStartTime: soccerField.workStartTime,
                    workDays: soccerField.workDays,
                });
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerField = yield this.model.findById(id).exec();
            if (!soccerField)
                return null;
            return this.parseToEntity(soccerField);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const soccerField = yield this.model.findOne({ name }).exec();
            if (!soccerField)
                return null;
            return this.parseToEntity(soccerField);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = new this.model(data);
            yield created.save();
            if (!created)
                return null;
            return this.parseToEntity(created);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.model
                .findByIdAndUpdate(id, payload, { new: true })
                .exec();
            if (!updated)
                return null;
            return this.parseToEntity(updated);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.model.findByIdAndDelete(id).exec();
        });
    }
    parseToEntity(document) {
        return new soccer_field_1.SoccerField({
            id: document._id,
            pixKey: document.pixKey,
            rentalValue: document.rentalValue,
            workFinishTime: document.workFinishTime,
            workStartTime: document.workStartTime,
            workDays: document.workDays,
        });
    }
}
exports.SoccerFieldMongoRepository = SoccerFieldMongoRepository;
