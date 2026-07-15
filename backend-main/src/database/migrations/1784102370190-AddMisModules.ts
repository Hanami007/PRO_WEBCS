import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMisModules1784102370190 implements MigrationInterface {
    name = 'AddMisModules1784102370190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."mis_repair_request_status_enum" AS ENUM('pending', 'in_progress', 'resolved')`);
        await queryRunner.query(`CREATE TABLE "mis_repair_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reporterName" character varying(255) NOT NULL, "location" character varying(255) NOT NULL, "itemName" character varying(255) NOT NULL, "description" text NOT NULL, "status" "public"."mis_repair_request_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "imageId" uuid, CONSTRAINT "REL_3d9e7077f3e7985333f6739007" UNIQUE ("imageId"), CONSTRAINT "PK_319ee1b5c763631dcd1038d7bc4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."mis_equipment_borrow_status_enum" AS ENUM('borrowed', 'returned', 'overdue')`);
        await queryRunner.query(`CREATE TABLE "mis_equipment_borrow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "borrowerName" character varying(255) NOT NULL, "equipmentName" character varying(255) NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "borrowDate" date NOT NULL, "returnDate" date NOT NULL, "status" "public"."mis_equipment_borrow_status_enum" NOT NULL DEFAULT 'borrowed', "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9fa29cd3cb414014c6a726ec94b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."mis_course_pending_status_enum" AS ENUM('pending', 'in_progress', 'resolved')`);
        await queryRunner.query(`CREATE TABLE "mis_course_pending" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "studentId" character varying(20) NOT NULL, "studentName" character varying(255) NOT NULL, "courseCode" character varying(20) NOT NULL, "courseName" character varying(255) NOT NULL, "subjectType" character varying(20) NOT NULL DEFAULT '1', "advisor" character varying(255), "reason" text NOT NULL, "status" "public"."mis_course_pending_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_babbf56f6b769612ed39fa7f9a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mis_repair_request" ADD CONSTRAINT "FK_3d9e7077f3e7985333f67390077" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mis_repair_request" DROP CONSTRAINT "FK_3d9e7077f3e7985333f67390077"`);
        await queryRunner.query(`DROP TABLE "mis_course_pending"`);
        await queryRunner.query(`DROP TYPE "public"."mis_course_pending_status_enum"`);
        await queryRunner.query(`DROP TABLE "mis_equipment_borrow"`);
        await queryRunner.query(`DROP TYPE "public"."mis_equipment_borrow_status_enum"`);
        await queryRunner.query(`DROP TABLE "mis_repair_request"`);
        await queryRunner.query(`DROP TYPE "public"."mis_repair_request_status_enum"`);
    }

}
