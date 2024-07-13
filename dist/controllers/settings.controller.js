"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const settings_dto_1 = require("../dto/settings.dto");
const settings_repository_1 = require("../repositories/settings.repository");
const dataValidation_1 = require("../utils/dataValidation");
class SettingsController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const settings = yield settings_repository_1.settingsRepository.findOne({ where: { id: 1 } });
                return res.status(200).json({
                    status: 'success',
                    data: settings,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { driverLimitPerTruck, truckLimitPerMonth } = req.body;
            const createSettingsDTO = new settings_dto_1.CreateSettingsDTO();
            createSettingsDTO.driverLimitPerTruck = driverLimitPerTruck;
            createSettingsDTO.truckLimitPerMonth = truckLimitPerMonth;
            const errors = yield (0, class_validator_1.validate)(createSettingsDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const editedSettings = yield settings_repository_1.settingsRepository.save({
                    id: 1,
                    driverLimitPerTruck,
                    truckLimitPerMonth,
                });
                return res.status(201).json({
                    status: 'success',
                    data: editedSettings,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
}
exports.default = new SettingsController();
