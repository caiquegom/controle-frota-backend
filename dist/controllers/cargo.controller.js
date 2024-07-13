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
const typeorm_1 = require("typeorm");
const cargo_dto_1 = require("../dto/cargo.dto");
const cargo_repository_1 = require("../repositories/cargo.repository");
const cargo_service_1 = __importDefault(require("../services/cargo.service"));
const dataValidation_1 = require("../utils/dataValidation");
class CargoController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cargosList = yield cargo_repository_1.cargoRepository.find({
                    order: {
                        createdAt: 'ASC',
                    },
                    relations: ['delivery'],
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: cargosList,
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
            const cargoId = req.params.id;
            try {
                const cargo = yield cargo_repository_1.cargoRepository.findOne({
                    where: {
                        id: Number(cargoId),
                    },
                    withDeleted: false,
                });
                if (!cargo) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Cargo not found',
                    });
                }
                return res.status(200).json({
                    status: 'success',
                    data: cargo,
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
            const { name, type, description } = req.body;
            const createCargoDTO = new cargo_dto_1.CreateCargoDTO();
            createCargoDTO.name = name;
            createCargoDTO.type = type;
            createCargoDTO.description = description;
            const errors = yield (0, class_validator_1.validate)(createCargoDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const newCargo = cargo_repository_1.cargoRepository.create({
                    name,
                    type,
                    description,
                });
                yield cargo_repository_1.cargoRepository.save(newCargo);
                return res.status(201).json({
                    status: 'success',
                    data: newCargo,
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
            const cargoId = req.params.id;
            const { name, type, description } = req.body;
            const updateCargoDTO = new cargo_dto_1.UpdateCargoDTO();
            updateCargoDTO.name = name;
            updateCargoDTO.type = type;
            updateCargoDTO.description = description;
            const errors = yield (0, class_validator_1.validate)(updateCargoDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const cargo = yield cargo_repository_1.cargoRepository.findOne({
                    where: { id: Number(cargoId) },
                    withDeleted: false,
                });
                if (!cargo) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Cargo not found',
                    });
                }
                const editedCargo = yield cargo_repository_1.cargoRepository.save({
                    id: Number(cargoId),
                    name: name,
                    type,
                    description,
                });
                return res.status(201).json({
                    status: 'success',
                    data: editedCargo,
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
            const cargoId = req.params.id;
            try {
                const cargo = yield cargo_repository_1.cargoRepository.findOne({
                    where: {
                        id: Number(cargoId),
                    },
                    withDeleted: false,
                });
                if (!cargo) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Cargo not found',
                    });
                }
                const canDeleteCargo = yield cargo_service_1.default.canDelete(Number(cargoId));
                if (!canDeleteCargo) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Carga está cadastrada em uma entrega',
                    });
                }
                yield cargo_repository_1.cargoRepository.softDelete({ id: Number(cargoId) });
                return res.status(200).json({
                    status: 'success',
                    data: 'Cargo deleted',
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
    getAvailables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cargosList = yield cargo_repository_1.cargoRepository.find({
                    relations: ['delivery'],
                    where: {
                        delivered: false,
                        delivery: {
                            id: (0, typeorm_1.IsNull)(),
                        },
                    },
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: cargosList,
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
exports.default = new CargoController();
