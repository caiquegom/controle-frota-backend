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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const region_dto_1 = require("../dto/region.dto");
const region_repository_1 = require("../repositories/region.repository");
const regions_service_1 = __importDefault(require("../services/regions.service"));
const dataValidation_1 = require("../utils/dataValidation");
class RegionController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regionList = yield region_repository_1.regionRepository.find({
                    order: {
                        createdAt: 'ASC',
                    },
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: regionList,
                });
            }
            catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionId = req.params.id;
            try {
                const region = yield region_repository_1.regionRepository.findOne({
                    where: {
                        id: Number(regionId),
                    },
                    withDeleted: false,
                });
                if (!region) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Region not found',
                    });
                }
                return res.status(200).json({
                    status: 'success',
                    data: region,
                });
            }
            catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, tax, driverLimitPerMonth } = req.body;
            const createRegionDTO = new region_dto_1.CreateRegionDTO();
            createRegionDTO.name = name;
            createRegionDTO.tax = tax;
            createRegionDTO.driverLimitPerMonth = driverLimitPerMonth;
            const errors = yield (0, class_validator_1.validate)(createRegionDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const newRegion = region_repository_1.regionRepository.create({
                    name,
                    tax,
                    driverLimitPerMonth,
                });
                yield region_repository_1.regionRepository.save(newRegion);
                return res.status(201).json({
                    status: 'success',
                    data: newRegion,
                });
            }
            catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionId = req.params.id;
            const { name, tax, driverLimitPerMonth } = req.body;
            const updateRegionDTO = new region_dto_1.UpdateRegionDTO();
            updateRegionDTO.name = name;
            updateRegionDTO.tax = tax;
            updateRegionDTO.driverLimitPerMonth = driverLimitPerMonth;
            const errors = yield (0, class_validator_1.validate)(updateRegionDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const region = yield region_repository_1.regionRepository.findOne({
                    where: { id: Number(regionId) },
                    withDeleted: false,
                });
                if (!region) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Region not found',
                    });
                }
                const editedRegion = yield region_repository_1.regionRepository.save({
                    id: Number(regionId),
                    name,
                    tax,
                    driverLimitPerMonth,
                });
                return res.status(201).json({
                    status: 'success',
                    data: editedRegion,
                });
            }
            catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionId = req.params.id;
            try {
                const region = yield region_repository_1.regionRepository.findOne({
                    where: {
                        id: Number(regionId),
                    },
                    withDeleted: false,
                });
                if (!region) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Region not found',
                    });
                }
                const canDeleteRegion = yield regions_service_1.default.canDelete(Number(regionId));
                if (!canDeleteRegion) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Região está cadastrada em uma entrega',
                    });
                }
                yield region_repository_1.regionRepository.softDelete({ id: Number(regionId) });
                return res.status(200).json({
                    status: 'success',
                    data: 'Region deleted',
                });
            }
            catch (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
}
exports.default = new RegionController();
