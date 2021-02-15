import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Users {
  @Field(() => String, { nullable: true })
  @PrimaryKey()
  id!: number;

  @Field(() => String, { nullable: true })
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String, { nullable: true })
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String, { nullable: true })
  @Property({ type: "text", unique: true })
  userName!: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "text" })
  userPassword!: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "text", unique: true })
  userEmail!: string;
}
