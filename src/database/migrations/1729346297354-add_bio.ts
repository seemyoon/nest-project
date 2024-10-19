import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBio1729346297354 implements MigrationInterface {
    name = 'AddBio1729346297354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isBio" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBio"`);
    }

}
