import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720550070305 implements MigrationInterface {
    name = 'Default1720550070305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cargos" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cargos" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cargos" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cargos" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "regions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "regions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "regions" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "trucks" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "regions" ADD CONSTRAINT "UQ_1eb9a8899a7db89f6ba473fd847" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "deletedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "regions" DROP CONSTRAINT "UQ_1eb9a8899a7db89f6ba473fd847"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "trucks" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "regions" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "regions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "regions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "cargos" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "cargos" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "cargos" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "cargos" DROP COLUMN "name"`);
    }

}
