import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720670586153 implements MigrationInterface {
    name = 'Default1720670586153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "driverLimitPerTruck" integer NOT NULL, "truckLimitPerMonth" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
