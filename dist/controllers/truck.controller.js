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
const truck_dto_1 = require("../dto/truck.dto");
const truck_repository_1 = require("../repositories/truck.repository");
const truck_service_1 = __importDefault(require("../services/truck.service"));
const dataValidation_1 = require("../utils/dataValidation");
class TruckController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trucksList = yield truck_repository_1.truckRepository.find({
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: trucksList,
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
            const truckId = req.params.id;
            try {
                const truck = yield truck_repository_1.truckRepository.findOne({
                    where: {
                        id: Number(truckId),
                    },
                    withDeleted: false,
                });
                if (!truck) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Truck not found',
                    });
                }
                return res.status(200).json({
                    status: 'success',
                    data: truck,
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
            const { plate, brand, model, year, capacity } = req.body;
            const createTruckDTO = new truck_dto_1.CreateTruckDTO();
            createTruckDTO.plate = plate;
            createTruckDTO.brand = brand;
            createTruckDTO.model = model;
            createTruckDTO.year = year;
            createTruckDTO.capacity = capacity;
            const errors = yield (0, class_validator_1.validate)(createTruckDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const truckByPlate = yield truck_repository_1.truckRepository.findOne({
                    where: { plate },
                    withDeleted: false,
                });
                if (truckByPlate) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Placa já cadastrada',
                    });
                }
                const newTruck = truck_repository_1.truckRepository.create({
                    plate,
                    brand,
                    model,
                    year,
                    capacity,
                });
                yield truck_repository_1.truckRepository.save(newTruck);
                return res.status(201).json({
                    status: 'success',
                    data: newTruck,
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
            const truckId = req.params.id;
            const { plate, brand, model, year, capacity } = req.body;
            const updateTruckDTO = new truck_dto_1.UpdateTruckDTO();
            updateTruckDTO.plate = plate;
            updateTruckDTO.brand = brand;
            updateTruckDTO.model = model;
            updateTruckDTO.year = year;
            updateTruckDTO.capacity = capacity;
            const errors = yield (0, class_validator_1.validate)(updateTruckDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const truck = yield truck_repository_1.truckRepository.findOne({
                    where: { id: Number(truckId) },
                    withDeleted: false,
                });
                const otherTruckByPlate = yield truck_repository_1.truckRepository.findOne({
                    where: { plate, id: (0, typeorm_1.Not)(Number(truckId)) },
                    withDeleted: false,
                });
                if (otherTruckByPlate) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Placa já cadastrada',
                    });
                }
                if (!truck) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Truck not found',
                    });
                }
                const editedTruck = yield truck_repository_1.truckRepository.save({
                    id: Number(truckId),
                    plate,
                    brand,
                    model,
                    year,
                    capacity,
                });
                return res.status(201).json({
                    status: 'success',
                    data: editedTruck,
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
            const truckId = req.params.id;
            try {
                const truck = yield truck_repository_1.truckRepository.findOne({
                    where: {
                        id: Number(truckId),
                    },
                    withDeleted: false,
                });
                if (!truck) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Truck not found',
                    });
                }
                const canDeleteTruck = yield truck_service_1.default.canDelete(Number(truckId));
                if (!canDeleteTruck) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Caminhão está cadastrado em uma entrega',
                    });
                }
                yield truck_repository_1.truckRepository.softDelete({ id: Number(truckId) });
                return res.status(200).json({
                    status: 'success',
                    data: 'Truck deleted',
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
                const trucksList = yield truck_repository_1.truckRepository.find({
                    order: {
                        createdAt: 'ASC',
                    },
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: trucksList,
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: err,
                });
            }
        });
    }
    getAmount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trucksCount = yield truck_repository_1.truckRepository.count({
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: { amount: trucksCount },
                });
            }
            catch (_a) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Erro interno no servidor',
                });
            }
        });
    }
}
exports.default = new TruckController();
