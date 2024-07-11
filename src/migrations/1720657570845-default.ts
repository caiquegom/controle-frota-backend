import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720657570845 implements MigrationInterface {
    name = 'Default1720657570845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "startedAt"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "finishedAt"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "deliveryDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."deliveries_status_enum" RENAME TO "deliveries_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."deliveries_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'CANCELED', 'FINISHED')`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "status" TYPE "public"."deliveries_status_enum" USING "status"::"text"::"public"."deliveries_status_enum"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."deliveries_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."deliveries_status_enum_old" AS ENUM('PENDING', 'IN_PROGRESS', 'CANCELED')`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "status" TYPE "public"."deliveries_status_enum_old" USING "status"::"text"::"public"."deliveries_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."deliveries_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."deliveries_status_enum_old" RENAME TO "deliveries_status_enum"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "deliveryDate"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "finishedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "startedAt" TIMESTAMP NOT NULL`);
    }

}
