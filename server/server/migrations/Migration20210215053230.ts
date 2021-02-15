import { Migration } from '@mikro-orm/migrations';

export class Migration20210215053230 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_name" text not null, "user_password" text not null, "user_email" text not null);');
    this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');
    this.addSql('alter table "users" add constraint "users_user_email_unique" unique ("user_email");');

    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
  }

}
