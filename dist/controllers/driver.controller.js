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
const driver_dto_1 = require("../dto/driver.dto");
const driver_repository_1 = require("../repositories/driver.repository");
const driver_service_1 = __importDefault(require("../services/driver.service"));
const dataValidation_1 = require("../utils/dataValidation");
class DriverController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driversList = yield driver_repository_1.driverRepository.find({
                    order: {
                        createdAt: 'ASC',
                    },
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: driversList,
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
            const driverId = req.params.id;
            try {
                const driver = yield driver_repository_1.driverRepository.findOne({
                    where: {
                        id: Number(driverId),
                    },
                    withDeleted: false,
                });
                if (!driver) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Driver not found',
                    });
                }
                return res.status(200).json({
                    status: 'success',
                    data: driver,
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
            const { name, email, phone } = req.body;
            const createDriverDTO = new driver_dto_1.CreateDriverDTO();
            createDriverDTO.name = name;
            createDriverDTO.email = email;
            createDriverDTO.phone = phone;
            const errors = yield (0, class_validator_1.validate)(createDriverDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const driverByEmail = yield driver_repository_1.driverRepository.findOne({
                    where: { email },
                    withDeleted: false,
                });
                if (driverByEmail) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'E-mail já cadastrado',
                    });
                }
                const driverByPhone = yield driver_repository_1.driverRepository.findOne({
                    where: { phone },
                    withDeleted: false,
                });
                if (driverByPhone) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Telefone já cadastrado',
                    });
                }
                const newDriver = driver_repository_1.driverRepository.create({
                    name,
                    email,
                    phone,
                });
                yield driver_repository_1.driverRepository.save(newDriver);
                return res.status(201).json({
                    status: 'success',
                    data: newDriver,
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
            const driverId = req.params.id;
            const { name, email, phone } = req.body;
            const updateDriverDTO = new driver_dto_1.UpdateDriverDTO();
            updateDriverDTO.name = name;
            updateDriverDTO.email = email;
            updateDriverDTO.phone = phone;
            const errors = yield (0, class_validator_1.validate)(updateDriverDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const driver = yield driver_repository_1.driverRepository.findOne({
                    where: { id: Number(driverId) },
                    withDeleted: false,
                });
                if (!driver) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Driver not found',
                    });
                }
                const otherDriverByEmail = yield driver_repository_1.driverRepository.findOne({
                    where: { id: (0, typeorm_1.Not)(Number(driverId)), email },
                    withDeleted: false,
                });
                if (otherDriverByEmail) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'E-mail já cadastrado',
                    });
                }
                const otherDriverByPhone = yield driver_repository_1.driverRepository.findOne({
                    where: { id: (0, typeorm_1.Not)(Number(driverId)), phone },
                    withDeleted: false,
                });
                if (otherDriverByPhone) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Telefone já cadastrado',
                    });
                }
                const editedDriver = yield driver_repository_1.driverRepository.save({
                    id: Number(driverId),
                    name,
                    email,
                    phone,
                });
                return res.status(201).json({
                    status: 'success',
                    data: editedDriver,
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
            const driverId = req.params.id;
            try {
                const driver = yield driver_repository_1.driverRepository.findOne({
                    where: {
                        id: Number(driverId),
                    },
                    withDeleted: false,
                });
                if (!driver) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Driver not found',
                    });
                }
                const canDeleteDriver = yield driver_service_1.default.canDelete(Number(driverId));
                if (!canDeleteDriver) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Motorista está cadastrado em uma entrega',
                    });
                }
                yield driver_repository_1.driverRepository.softDelete({ id: Number(driverId) });
                return res.status(200).json({
                    status: 'success',
                    data: 'Driver deleted',
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
                const driversList = yield driver_repository_1.driverRepository.find({
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: driversList,
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
    getAmount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driversCount = yield driver_repository_1.driverRepository.count({
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: { amount: driversCount },
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
exports.default = new DriverController();
