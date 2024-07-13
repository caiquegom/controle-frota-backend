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
const delivery_dto_1 = require("../dto/delivery.dto");
const delivery_repository_1 = require("../repositories/delivery.repository");
const cargo_service_1 = __importDefault(require("../services/cargo.service"));
const delivery_service_1 = __importDefault(require("../services/delivery.service"));
const dataValidation_1 = require("../utils/dataValidation");
const dateFormatDatabase_1 = require("../utils/dateFormatDatabase");
class DeliveryController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliverysList = yield delivery_repository_1.deliveryRepository.find({
                    order: {
                        createdAt: 'ASC',
                    },
                    relations: ['driver', 'cargo', 'truck', 'destiny'],
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: deliverysList,
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
            const deliveryId = req.params.id;
            try {
                const delivery = yield delivery_repository_1.deliveryRepository.findOne({
                    where: {
                        id: Number(deliveryId),
                    },
                    withDeleted: false,
                });
                if (!delivery) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Entrega não encontrada',
                    });
                }
                return res.status(200).json({
                    status: 'success',
                    data: delivery,
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
            const { destinyId, truckId, driverId, cargoId, value, hasInsurance, deliveryDate, } = req.body;
            const deliveryAttributes = {
                destinyId,
                truckId,
                driverId,
                cargoId,
                value,
                hasInsurance,
                deliveryDate,
            };
            const createDeliveryDTO = new delivery_dto_1.CreateDeliveryDTO();
            Object.keys(deliveryAttributes).forEach((item) => {
                createDeliveryDTO[item] = deliveryAttributes[item];
            });
            const errors = yield (0, class_validator_1.validate)(createDeliveryDTO);
            if (errors.length >= 1) {
                return res.status(404).json({
                    status: 'error',
                    message: (0, dataValidation_1.formatValidatorErrors)(errors),
                });
            }
            try {
                const isCargoAvailable = yield cargo_service_1.default.verifyIfIsOnDelivery(cargoId);
                if (isCargoAvailable) {
                    return res.status(409).json({
                        status: 'error',
                        message: 'Carga está cadastrada em outra entrega',
                    });
                }
                const validationMessage = yield delivery_service_1.default.validateDriverAndTruck(driverId, truckId, destinyId, deliveryDate);
                if (validationMessage) {
                    return res.status(409).json({
                        status: 'error',
                        message: validationMessage,
                    });
                }
                const deliveryObject = yield delivery_service_1.default.createNewDeliveryObject(createDeliveryDTO);
                const newDelivery = delivery_repository_1.deliveryRepository.create(deliveryObject);
                yield delivery_repository_1.deliveryRepository.save(newDelivery);
                return res.status(200).json({
                    status: 'success',
                    data: newDelivery,
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deliveryId = req.params.id;
            try {
                const delivery = yield delivery_repository_1.deliveryRepository.findOne({
                    where: {
                        id: Number(deliveryId),
                    },
                    withDeleted: false,
                });
                if (!delivery) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'Delivery not found',
                    });
                }
                yield delivery_repository_1.deliveryRepository.delete({ id: Number(deliveryId) });
                return res.status(200).json({
                    status: 'success',
                    data: 'Delivery deleted',
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
    getOfDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = req.query.date;
            const formattedDate = (0, dateFormatDatabase_1.formatTimeForDatabase)(new Date(date));
            try {
                const deliveriesByDate = yield delivery_repository_1.deliveryRepository.find({
                    relations: ['driver', 'cargo', 'truck', 'destiny'],
                    where: {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        deliveryDate: formattedDate,
                    },
                    withDeleted: false,
                });
                return res.status(200).json({
                    status: 'success',
                    data: deliveriesByDate,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: error,
                });
            }
        });
    }
}
exports.default = new DeliveryController();
