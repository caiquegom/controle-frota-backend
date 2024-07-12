import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720767428336 implements MigrationInterface {
    name = 'Default1720767428336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trucks" DROP CONSTRAINT "FK_f2848c35a59188578ac7d31d8a6"`);
        await queryRunner.query(`ALTER TABLE "trucks" DROP CONSTRAINT "UQ_f2848c35a59188578ac7d31d8a6"`);
        await queryRunner.query(`ALTER TABLE "trucks" DROP COLUMN "driverId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trucks" ADD "driverId" integer`);
        await queryRunner.query(`ALTER TABLE "trucks" ADD CONSTRAINT "UQ_f2848c35a59188578ac7d31d8a6" UNIQUE ("driverId")`);
        await queryRunner.query(`ALTER TABLE "trucks" ADD CONSTRAINT "FK_f2848c35a59188578ac7d31d8a6" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
