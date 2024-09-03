"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDate = exports.formatDate = void 0;
const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
exports.formatDate = formatDate;
const stringToDate = (date) => {
    const [day, month, year] = date.split('/').map((part) => parseInt(part, 10));
    return new Date(year, month - 1, day);
};
exports.stringToDate = stringToDate;
