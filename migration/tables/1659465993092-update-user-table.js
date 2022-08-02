const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUserTable1659465993092 {
    name = 'updateUserTable1659465993092'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_login" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "intro" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "intro" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_login" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL`);
    }
}
