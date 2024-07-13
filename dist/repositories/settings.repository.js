"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRepository = void 0;
const data_source_1 = require("../data-source");
const settings_entity_1 = require("../entities/settings.entity");
exports.settingsRepository = data_source_1.AppDataSource.getRepository(settings_entity_1.Settings);
