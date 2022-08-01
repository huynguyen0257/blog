const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUserTable1658599471948 {
    name = 'updateUserTable1658599471948'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastLogin" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastLogin" TIMESTAMP NOT NULL`);
    }
}
