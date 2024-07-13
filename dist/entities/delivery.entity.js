"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const cargo_entity_1 = require("./cargo.entity");
const driver_entity_1 = require("./driver.entity");
const region_entity_1 = require("./region.entity");
const truck_entity_1 = require("./truck.entity");
let Delivery = class Delivery {
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Delivery.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Delivery.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Delivery.prototype, "totalValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Delivery.prototype, "isValuable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Delivery.prototype, "isDangerous", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Delivery.prototype, "hasInsurance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Delivery.prototype, "deliveryDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Delivery.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Delivery.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => region_entity_1.Region, (region) => region.deliveries),
    (0, typeorm_1.JoinColumn)({ name: 'destinyId' }),
    __metadata("design:type", region_entity_1.Region)
], Delivery.prototype, "destiny", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => truck_entity_1.Truck, (truck) => truck.deliveries),
    (0, typeorm_1.JoinColumn)({ name: 'truckId' }),
    __metadata("design:type", truck_entity_1.Truck)
], Delivery.prototype, "truck", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.Driver, (driver) => driver.deliveries),
    (0, typeorm_1.JoinColumn)({ name: 'driverId' }),
    __metadata("design:type", driver_entity_1.Driver)
], Delivery.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cargo_entity_1.Cargo, (cargo) => cargo.delivery, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'cargoId' }),
    __metadata("design:type", cargo_entity_1.Cargo)
], Delivery.prototype, "cargo", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)('deliveries')
], Delivery);
