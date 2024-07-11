import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720650668421 implements MigrationInterface {
    name = 'Default1720650668421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cargos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."cargos_type_enum" NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_052f813788106484e4ef7cd1745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2" UNIQUE ("email"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tax" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_1eb9a8899a7db89f6ba473fd847" UNIQUE ("name"), CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("id" SERIAL NOT NULL, "status" "public"."deliveries_status_enum" NOT NULL DEFAULT 'PENDING', "value" double precision NOT NULL, "tax" double precision NOT NULL, "totalValue" double precision NOT NULL, "isValuable" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "startedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, "finishedAt" TIMESTAMP NOT NULL, "destinyId" integer, "truckId" integer, "driverId" integer, "cargoId" integer, CONSTRAINT "REL_42a724f286341ea40a7f980cb0" UNIQUE ("cargoId"), CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trucks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" character varying(4) NOT NULL, "capacity" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_6a134fb7caa4fb476d8a6e035f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_86f92d7a077f1675009ecce1383" FOREIGN KEY ("destinyId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_3c3fc4207e47e794040e83b83fd" FOREIGN KEY ("truckId") REFERENCES "trucks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_a6cc84e1c957ed2d25bd7eda4ba" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_42a724f286341ea40a7f980cb01" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_42a724f286341ea40a7f980cb01"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_a6cc84e1c957ed2d25bd7eda4ba"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_3c3fc4207e47e794040e83b83fd"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_86f92d7a077f1675009ecce1383"`);
        await queryRunner.query(`DROP TABLE "trucks"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TABLE "cargos"`);
    }

}
