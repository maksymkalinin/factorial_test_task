import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTodoListAndTodoItem1596136950939 implements MigrationInterface {
    name = 'CreateTodoListAndTodoItem1596136950939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo_list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a5448d48035763b9dbab86555b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_item" ("id" SERIAL NOT NULL, "text" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "todoListId" integer, CONSTRAINT "PK_d454c4b9eac15cc27c2ed8e4138" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD CONSTRAINT "FK_3aba7e189db12c46ca339996459" FOREIGN KEY ("todoListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" DROP CONSTRAINT "FK_3aba7e189db12c46ca339996459"`);
        await queryRunner.query(`DROP TABLE "todo_item"`);
        await queryRunner.query(`DROP TABLE "todo_list"`);
    }

}
