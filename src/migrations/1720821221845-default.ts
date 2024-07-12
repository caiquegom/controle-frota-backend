import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720821221845 implements MigrationInterface {
    name = 'Default1720821221845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_86f92d7a077f1675009ecce1383"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_3c3fc4207e47e794040e83b83fd"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_a6cc84e1c957ed2d25bd7eda4ba"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_42a724f286341ea40a7f980cb01"`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "destinyId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "truckId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "driverId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "cargoId" DROP NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "cargoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "driverId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "truckId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ALTER COLUMN "destinyId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_42a724f286341ea40a7f980cb01" FOREIGN KEY ("cargoId") REFERENCES "cargos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_a6cc84e1c957ed2d25bd7eda4ba" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_3c3fc4207e47e794040e83b83fd" FOREIGN KEY ("truckId") REFERENCES "trucks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_86f92d7a077f1675009ecce1383" FOREIGN KEY ("destinyId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
