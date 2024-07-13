"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truckRepository = void 0;
const data_source_1 = require("../data-source");
const truck_entity_1 = require("../entities/truck.entity");
exports.truckRepository = data_source_1.AppDataSource.getRepository(truck_entity_1.Truck);
