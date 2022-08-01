const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class user1658599347028 {
    name = 'user1658599347028'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "middle_name" character varying NOT NULL, "last_name" character varying NOT NULL, "mobile" character varying(15) NOT NULL, "email" character varying NOT NULL, "password" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "lastLogin" TIMESTAMP NOT NULL, "intro" text NOT NULL, "profile" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
