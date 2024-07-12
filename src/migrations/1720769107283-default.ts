import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720769107283 implements MigrationInterface {
    name = 'Default1720769107283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cargos" ADD "delivered" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cargos" DROP COLUMN "delivered"`);
    }

}
