"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargoRepository = void 0;
const data_source_1 = require("../data-source");
const cargo_entity_1 = require("../entities/cargo.entity");
exports.cargoRepository = data_source_1.AppDataSource.getRepository(cargo_entity_1.Cargo);
