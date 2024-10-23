import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntities1729686208281 implements MigrationInterface {
    name = 'AddEntities1729686208281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "body" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "article_id" character varying NOT NULL, "articles_id" uuid, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("created" TIMESTAMP NOT NULL DEFAULT now(), "update" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("created" TIMESTAMP NOT NULL DEFAULT now(), "update" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "body" text, "user_id" uuid NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("created" TIMESTAMP NOT NULL DEFAULT now(), "update" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" character varying NOT NULL, "deviceId" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags_articles_articles" ("tagsId" uuid NOT NULL, "articlesId" uuid NOT NULL, CONSTRAINT "PK_4a3f3c7b50261f684e36cbc7f53" PRIMARY KEY ("tagsId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9cde82be45586fa8795dda71b" ON "tags_articles_articles" ("tagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d88b8d0e1656c425c6bfd66a9" ON "tags_articles_articles" ("articlesId") `);
        await queryRunner.query(`CREATE TABLE "articles_tag_tags" ("articlesId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_d76e8b246be6d53cad1a9c915ad" PRIMARY KEY ("articlesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5a46d2f5d372869d10458329b6" ON "articles_tag_tags" ("articlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c88ec1fb0119b27b948d2e232" ON "articles_tag_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "update" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "image" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_7cba565d874717c75d1a78e2a7f" FOREIGN KEY ("articles_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" ADD CONSTRAINT "FK_b9cde82be45586fa8795dda71b3" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" ADD CONSTRAINT "FK_9d88b8d0e1656c425c6bfd66a9d" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles_tag_tags" ADD CONSTRAINT "FK_5a46d2f5d372869d10458329b64" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles_tag_tags" ADD CONSTRAINT "FK_5c88ec1fb0119b27b948d2e232f" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles_tag_tags" DROP CONSTRAINT "FK_5c88ec1fb0119b27b948d2e232f"`);
        await queryRunner.query(`ALTER TABLE "articles_tag_tags" DROP CONSTRAINT "FK_5a46d2f5d372869d10458329b64"`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" DROP CONSTRAINT "FK_9d88b8d0e1656c425c6bfd66a9d"`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" DROP CONSTRAINT "FK_b9cde82be45586fa8795dda71b3"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_7cba565d874717c75d1a78e2a7f"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "update"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" text NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c88ec1fb0119b27b948d2e232"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a46d2f5d372869d10458329b6"`);
        await queryRunner.query(`DROP TABLE "articles_tag_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d88b8d0e1656c425c6bfd66a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9cde82be45586fa8795dda71b"`);
        await queryRunner.query(`DROP TABLE "tags_articles_articles"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
