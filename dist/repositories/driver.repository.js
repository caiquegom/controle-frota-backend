"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRepository = void 0;
const data_source_1 = require("../data-source");
const driver_entity_1 = require("../entities/driver.entity");
exports.driverRepository = data_source_1.AppDataSource.getRepository(driver_entity_1.Driver);
