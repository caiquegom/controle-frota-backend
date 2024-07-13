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
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const cargo_entity_1 = require("../entities/cargo.entity");
const cargo_repository_1 = require("../repositories/cargo.repository");
const delivery_repository_1 = require("../repositories/delivery.repository");
const region_repository_1 = require("../repositories/region.repository");
const settings_repository_1 = require("../repositories/settings.repository");
const dateFormatDatabase_1 = require("../utils/dateFormatDatabase");
class DeliveryService {
    createNewDeliveryObject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cargoId, driverId, truckId, destinyId } = data;
            const { tax } = yield region_repository_1.regionRepository.findOne({
                where: { id: data.destinyId },
            });
            const { type: cargoType } = yield cargo_repository_1.cargoRepository.findOne({
                where: { id: data.cargoId },
            });
            const totalValue = data.value * (1 + tax);
            const isValuable = totalValue > 30000;
            const isDangerous = cargoType === cargo_entity_1.CargoType.FUEL;
            return Object.assign(Object.assign({}, data), { tax, cargo: { id: cargoId }, driver: { id: driverId }, truck: { id: truckId }, destiny: { id: destinyId }, totalValue,
                isValuable,
                isDangerous });
        });
    }
    verifyTruckSurpassedMonthTrips(truckId, deliveryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const deliveryMonth = (0, date_fns_1.getMonth)(deliveryDate);
            const deliveryYear = (0, date_fns_1.getYear)(deliveryDate);
            const lastMonthDay = (0, dateFormatDatabase_1.formatTimeForDatabase)((0, date_fns_1.lastDayOfMonth)(deliveryDate));
            const firstMonthDay = (0, dateFormatDatabase_1.formatTimeForDatabase)(new Date(deliveryYear, deliveryMonth, 1, 0, 0, 0, 0));
            const { truckLimitPerMonth } = yield settings_repository_1.settingsRepository.findOne({
                where: { id: 1 },
            });
            if (truckLimitPerMonth === 0)
                return false;
            const truckMonthTripsAmount = yield delivery_repository_1.deliveryRepository.count({
                where: {
                    truck: {
                        id: truckId,
                    },
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    deliveryDate: (0, typeorm_1.Between)(firstMonthDay, lastMonthDay),
                },
                withDeleted: false,
            });
            return truckMonthTripsAmount >= truckLimitPerMonth;
        });
    }
    verifyIfTruckIsOnDelivery(truckId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deliveriesWithTruck = yield delivery_repository_1.deliveryRepository.findOne({
                where: {
                    deliveryDate: (0, typeorm_1.MoreThan)(new Date()),
                    truck: {
                        id: truckId,
                    },
                },
            });
            return !!deliveriesWithTruck;
        });
    }
    verifyDriverSurpassedDeliveriesToRegion(driverId, destinyId, deliveryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const deliveryMonth = (0, date_fns_1.getMonth)(deliveryDate);
            const deliveryYear = (0, date_fns_1.getYear)(deliveryDate);
            const lastMonthDay = (0, dateFormatDatabase_1.formatTimeForDatabase)((0, date_fns_1.lastDayOfMonth)(deliveryDate));
            const firstMonthDay = (0, dateFormatDatabase_1.formatTimeForDatabase)(new Date(deliveryYear, deliveryMonth, 1, 0, 0, 0, 0));
            const { driverLimitPerMonth } = yield region_repository_1.regionRepository.findOne({
                where: {
                    id: destinyId,
                },
            });
            if (driverLimitPerMonth === 0)
                return false;
            const driverTripsToRegionAmount = yield delivery_repository_1.deliveryRepository.count({
                where: {
                    driver: {
                        id: driverId,
                    },
                    destiny: {
                        id: destinyId,
                    },
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    deliveryDate: (0, typeorm_1.Between)(firstMonthDay, lastMonthDay),
                },
                withDeleted: false,
            });
            return driverTripsToRegionAmount >= driverLimitPerMonth;
        });
    }
    verifyIfDriverSurpassedDeliveriesWithTruck(driverId, truckId, deliveryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const deliveryMonth = (0, date_fns_1.getMonth)(deliveryDate);
            const deliveryYear = (0, date_fns_1.getYear)(deliveryDate);
            const lastMonthDay = (0, dateFormatDatabase_1.formatTimeForDatabase)((0, date_fns_1.lastDayOfMonth)(deliveryDate));
            const firstMonthDay = (0, dateFormatDatabase_1.formatTimeForDatabase)(new Date(deliveryYear, deliveryMonth, 1, 0, 0, 0, 0));
            const { driverLimitPerTruck } = yield settings_repository_1.settingsRepository.findOne({
                where: {
                    id: 1,
                },
            });
            if (driverLimitPerTruck === 0)
                return false;
            const driverTripsWithTruckMonthAmount = yield delivery_repository_1.deliveryRepository.count({
                where: {
                    driver: {
                        id: driverId,
                    },
                    truck: {
                        id: truckId,
                    },
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    deliveryDate: (0, typeorm_1.Between)(firstMonthDay, lastMonthDay),
                },
                withDeleted: false,
            });
            return driverTripsWithTruckMonthAmount >= driverLimitPerTruck;
        });
    }
    validateDriverAndTruck(driverId, truckId, destinyId, deliveryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const isTruckOnAnotherDelivery = yield this.verifyIfTruckIsOnDelivery(truckId);
            const canTruckDeliverThisMonth = yield this.verifyTruckSurpassedMonthTrips(truckId, deliveryDate);
            const canDriverDeliverToRegion = yield this.verifyDriverSurpassedDeliveriesToRegion(driverId, destinyId, deliveryDate);
            const canDriverDeliverWithTruck = yield this.verifyIfDriverSurpassedDeliveriesWithTruck(driverId, truckId, deliveryDate);
            if (isTruckOnAnotherDelivery)
                return 'Caminhão já está cadastrado em uma entrega';
            if (canTruckDeliverThisMonth)
                return 'Caminhão já atingiu o limite de entregas do mês';
            if (canDriverDeliverToRegion)
                return 'Motorista já atingiu o limite de entregas do mês para a região';
            if (canDriverDeliverWithTruck)
                return 'Motorista já atingiu o limite de entregas do mês com o caminhão';
            return '';
        });
    }
}
exports.default = new DeliveryService();
