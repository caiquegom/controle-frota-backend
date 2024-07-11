import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720659092567 implements MigrationInterface {
    name = 'Default1720659092567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "isDangerous" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "hasInsurance" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "hasInsurance"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "isDangerous"`);
    }

}
