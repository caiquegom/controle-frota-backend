"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryRepository = void 0;
const data_source_1 = require("../data-source");
const delivery_entity_1 = require("../entities/delivery.entity");
exports.deliveryRepository = data_source_1.AppDataSource.getRepository(delivery_entity_1.Delivery);
