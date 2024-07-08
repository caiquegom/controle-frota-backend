import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720467525390 implements MigrationInterface {
    name = 'Default1720467525390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cargos_type_enum" AS ENUM('eletronic', 'fuel', 'other')`);
        await queryRunner.query(`CREATE TABLE "cargos" ("id" SERIAL NOT NULL, "type" "public"."cargos_type_enum" NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_052f813788106484e4ef7cd1745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tax" double precision NOT NULL, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trucks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" character varying(4) NOT NULL, "capacity" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a134fb7caa4fb476d8a6e035f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'driver')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."deliveries_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("id" SERIAL NOT NULL, "status" "public"."deliveries_status_enum" NOT NULL DEFAULT 'PENDING', "value" double precision NOT NULL, "tax" double precision NOT NULL, "totalValue" double precision NOT NULL, "isValuable" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "startedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP NOT NULL, "finishedAt" TIMESTAMP NOT NULL, "destiny_id" integer, "truck_id" integer, "driver_id" integer, "cargo_id" integer, CONSTRAINT "REL_b67ad14ca2807ee9dda6a373f1" UNIQUE ("cargo_id"), CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_330d4f9627911068f72459b4f88" FOREIGN KEY ("destiny_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_a7bcceece077af4222e5a7273bf" FOREIGN KEY ("truck_id") REFERENCES "trucks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_0bb1b190c636bee8f5cafd239ef" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_b67ad14ca2807ee9dda6a373f13" FOREIGN KEY ("cargo_id") REFERENCES "cargos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_b67ad14ca2807ee9dda6a373f13"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_0bb1b190c636bee8f5cafd239ef"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_a7bcceece077af4222e5a7273bf"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_330d4f9627911068f72459b4f88"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TYPE "public"."deliveries_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "trucks"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TABLE "cargos"`);
        await queryRunner.query(`DROP TYPE "public"."cargos_type_enum"`);
    }

}
