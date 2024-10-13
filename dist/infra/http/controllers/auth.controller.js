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
const register_user_usecase_1 = require("../../../domain/use-cases/auth/register-user.usecase");
const user_presenter_1 = require("../../../application/presenters/user.presenter");
const http_status_code_1 = require("../../../domain/enums/http-status-code");
const authenticate_user_usecase_1 = require("../../../domain/use-cases/auth/authenticate-user.usecase");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield register_user_usecase_1.RegisterUserUseCase.execute(req.body);
            if (result.isLeft()) {
                res.status(result.value.code).send({
                    message: result.value.message,
                });
            }
            else if (result.value) {
                res.status(http_status_code_1.HttpStatusCode.CREATED).send({
                    user: (0, user_presenter_1.UserPresenter)(result.value),
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield authenticate_user_usecase_1.AutenticateUserUsecases.execute(req.body);
            if (result.isLeft()) {
                res.status(result.value.code).send({
                    message: result.value.message,
                });
            }
            else {
                res.status(http_status_code_1.HttpStatusCode.OK).send({ token: result.value });
            }
        });
    }
}
exports.default = new AuthController();
