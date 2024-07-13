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
exports.Default1720834365543 = void 0;
class Default1720834365543 {
    constructor() {
        this.name = 'Default1720834365543';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "cargos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."cargos_type_enum" NOT NULL, "description" text, "delivered" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_052f813788106484e4ef7cd1745" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2" UNIQUE ("email"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tax" double precision NOT NULL, "driverLimitPerMonth" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_1eb9a8899a7db89f6ba473fd847" UNIQUE ("name"), CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "deliveries" ("id" SERIAL NOT NULL, "value" double precision NOT NULL, "tax" double precision NOT NULL, "totalValue" double precision NOT NULL, "isValuable" boolean NOT NULL, "isDangerous" boolean NOT NULL, "hasInsurance" boolean NOT NULL, "deliveryDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "destinyId" integer, "truckId" integer, "driverId" integer, "cargoId" integer, CONSTRAINT "REL_42a724f286341ea40a7f980cb0" UNIQUE ("cargoId"), CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "trucks" ("id" SERIAL NOT NULL, "plate" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" character varying(4) NOT NULL, "capacity" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_43b4c59e7939442f60013292443" UNIQUE ("plate"), CONSTRAINT "PK_6a134fb7caa4fb476d8a6e035f9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "driverLimitPerTruck" integer NOT NULL, "truckLimitPerMonth" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_86f92d7a077f1675009ecce1383" FOREIGN KEY ("destinyId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_3c3fc4207e47e794040e83b83fd" FOREIGN KEY ("truckId") REFERENCES "trucks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_a6cc84e1c957ed2d25bd7eda4ba" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_42a724f286341ea40a7f980cb01" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_42a724f286341ea40a7f980cb01"`);
            yield queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_a6cc84e1c957ed2d25bd7eda4ba"`);
            yield queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_3c3fc4207e47e794040e83b83fd"`);
            yield queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_86f92d7a077f1675009ecce1383"`);
            yield queryRunner.query(`DROP TABLE "settings"`);
            yield queryRunner.query(`DROP TABLE "trucks"`);
            yield queryRunner.query(`DROP TABLE "deliveries"`);
            yield queryRunner.query(`DROP TABLE "regions"`);
            yield queryRunner.query(`DROP TABLE "drivers"`);
            yield queryRunner.query(`DROP TABLE "cargos"`);
        });
    }
}
exports.Default1720834365543 = Default1720834365543;
