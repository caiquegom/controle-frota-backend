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
exports.Cargo = exports.CargoType = void 0;
const typeorm_1 = require("typeorm");
const delivery_entity_1 = require("./delivery.entity");
var CargoType;
(function (CargoType) {
    CargoType["ELETRONIC"] = "eletronic";
    CargoType["FUEL"] = "fuel";
    CargoType["OTHER"] = "other";
})(CargoType || (exports.CargoType = CargoType = {}));
let Cargo = class Cargo {
};
exports.Cargo = Cargo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cargo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Cargo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CargoType }),
    __metadata("design:type", String)
], Cargo.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cargo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Cargo.prototype, "delivered", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cargo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cargo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Cargo.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => delivery_entity_1.Delivery, (delivery) => delivery.cargo),
    __metadata("design:type", delivery_entity_1.Delivery)
], Cargo.prototype, "delivery", void 0);
exports.Cargo = Cargo = __decorate([
    (0, typeorm_1.Entity)('cargos')
], Cargo);
