"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes"));
data_source_1.AppDataSource.initialize().then(() => {
    const SERVER_PORT = process.env.SERVER_PORT;
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use('/api', routes_1.default);
    app.listen(SERVER_PORT, () => {
        console.log(`Server rodando em http://localhost:${SERVER_PORT}`);
    });
});
