"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
const UserPresenter = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
    };
};
exports.UserPresenter = UserPresenter;
