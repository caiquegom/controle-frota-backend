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
const typeorm_1 = require("typeorm");
const cargo_repository_1 = require("../repositories/cargo.repository");
const delivery_repository_1 = require("../repositories/delivery.repository");
class CargoService {
    verifyIfIsOnDelivery(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cargo = yield cargo_repository_1.cargoRepository.findOne({
                relations: ['delivery'],
                where: {
                    id,
                    delivery: {
                        id: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
                    },
                },
            });
            return !!cargo;
        });
    }
    canDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deliveryWithCargo = yield delivery_repository_1.deliveryRepository.findOne({
                relations: ['cargo'],
                where: {
                    cargo: {
                        id,
                    },
                    deliveryDate: (0, typeorm_1.MoreThanOrEqual)(new Date()),
                },
                withDeleted: false,
            });
            return !deliveryWithCargo;
        });
    }
}
exports.default = new CargoService();
