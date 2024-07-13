"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeForDatabase = void 0;
const date_fns_1 = require("date-fns");
const formatTimeForDatabase = (value) => {
    return (0, date_fns_1.format)(value, 'yyyy-MM-dd  00:00:00.000000');
};
exports.formatTimeForDatabase = formatTimeForDatabase;
