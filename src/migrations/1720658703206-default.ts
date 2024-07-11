import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720658703206 implements MigrationInterface {
    name = 'Default1720658703206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."deliveries_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."deliveries_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'CANCELED', 'FINISHED')`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD "status" "public"."deliveries_status_enum" NOT NULL DEFAULT 'PENDING'`);
    }

}
