"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionRepository = void 0;
const data_source_1 = require("../data-source");
const region_entity_1 = require("../entities/region.entity");
exports.regionRepository = data_source_1.AppDataSource.getRepository(region_entity_1.Region);
